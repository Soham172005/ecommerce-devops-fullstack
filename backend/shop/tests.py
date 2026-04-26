"""Focused API smoke tests for critical user flows."""
from decimal import Decimal

from django.contrib.auth.models import User
from django.test import TestCase
from rest_framework.test import APIClient

from .models import Cart, Product


class ShopApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.product = Product.objects.create(
            name="Test Mug",
            slug="test-mug",
            description="A reliable ceramic mug.",
            price=Decimal("12.99"),
            stock=20,
            is_active=True,
        )

    def test_product_listing_is_public(self):
        response = self.client.get("/api/products/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data[0]["name"], "Test Mug")

    def test_register_creates_cart(self):
        response = self.client.post(
            "/api/auth/register/",
            {"username": "buyer", "email": "buyer@example.com", "password": "securepass123"},
            format="json",
        )
        self.assertEqual(response.status_code, 201)
        self.assertTrue(Cart.objects.filter(user__username="buyer").exists())

    def test_authenticated_user_can_add_to_cart(self):
        user = User.objects.create_user(username="buyer", password="securepass123")
        Cart.objects.create(user=user)
        self.client.force_authenticate(user=user)
        response = self.client.post(
            "/api/cart/",
            {"product_id": self.product.id, "quantity": 2},
            format="json",
        )
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data["items"][0]["quantity"], 2)

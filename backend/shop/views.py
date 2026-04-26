"""API views for authentication, catalog browsing, and cart management."""
from django.db import transaction
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Cart, CartItem, Product
from .serializers import CartItemSerializer, CartSerializer, ProductSerializer, RegisterSerializer


class RegisterView(generics.CreateAPIView):
    """Create a user account and an empty cart."""

    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]


class ProductListView(generics.ListAPIView):
    """Return all active products."""

    serializer_class = ProductSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        return Product.objects.filter(is_active=True)


class ProductDetailView(generics.RetrieveAPIView):
    """Return one active product by primary key."""

    serializer_class = ProductSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = "pk"

    def get_queryset(self):
        return Product.objects.filter(is_active=True)


class CartView(APIView):
    """View, add, update, and remove authenticated user's cart items."""

    permission_classes = [permissions.IsAuthenticated]

    def get_cart(self, user):
        cart, _ = Cart.objects.get_or_create(user=user)
        return cart

    def get(self, request):
        cart = self.get_cart(request.user)
        serializer = CartSerializer(cart)
        return Response(serializer.data)

    @transaction.atomic
    def post(self, request):
        cart = self.get_cart(request.user)
        serializer = CartItemSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        product = serializer.validated_data["product"]
        quantity = serializer.validated_data["quantity"]

        item, created = CartItem.objects.get_or_create(
            cart=cart,
            product=product,
            defaults={"quantity": quantity},
        )
        if not created:
            item.quantity += quantity
            item.save(update_fields=["quantity", "updated_at"])

        return Response(CartSerializer(cart).data, status=status.HTTP_201_CREATED)

    @transaction.atomic
    def patch(self, request):
        cart = self.get_cart(request.user)
        item_id = request.data.get("item_id")
        quantity = int(request.data.get("quantity", 1))
        if quantity < 1:
            return Response({"detail": "Quantity must be at least 1."}, status=status.HTTP_400_BAD_REQUEST)

        item = CartItem.objects.get(cart=cart, id=item_id)
        item.quantity = quantity
        item.save(update_fields=["quantity", "updated_at"])
        return Response(CartSerializer(cart).data)

    def delete(self, request):
        cart = self.get_cart(request.user)
        item_id = request.data.get("item_id")
        CartItem.objects.filter(cart=cart, id=item_id).delete()
        return Response(CartSerializer(cart).data)

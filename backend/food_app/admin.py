from django.contrib import admin
from .models import Category, Food


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("id", "name")


@admin.register(Food)
class FoodAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
        "category",
        "price",
        "available",
    )

    list_filter = ("category", "available")
    search_fields = ("name",)
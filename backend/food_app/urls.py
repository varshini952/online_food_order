from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, FoodViewSet,OrderViewSet


router = DefaultRouter()

router.register("categories", CategoryViewSet)
router.register("foods", FoodViewSet)
router.register("orders",OrderViewSet)


urlpatterns = [
    path("", include(router.urls)),
]
from django.urls import path, include
from rest_framework import routers

from . import views


router = routers.SimpleRouter()
router.register('chemical', views.ChemicalViewSet)
router.register('chemical_name', views.ChemicalNameViewSet)
router.register('date', views.ManageDateViewSet)
router.register('year_month', views.YearAndMonthViewSet)
router.register('profile', views.ProfileViewSet)

urlpatterns = [
    path('user/register/', views.CreateUserAPIView.as_view()),
    path('user/list/', views.UserListAPIView.as_view()),
    path('user/detail/<str:pk>/', views.UserPkAPIView.as_view()),

    path('compose/', include(router.urls)),
    path('compose/myprofile/', views.MyProfileAPIView.as_view()),
]

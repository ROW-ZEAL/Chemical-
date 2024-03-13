from django.urls import path
from . import views



urlpatterns = [
    path('aikyam', views.show_aikyam_member, name="api"),
    path('add/members', views.add_aikyam_members, name="api"),




]

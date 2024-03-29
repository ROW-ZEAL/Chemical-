from django.urls import path
from . import views



urlpatterns = [
    path('aikyam', views.show_aikyam_member, name="api"),
    path('add/members', views.add_aikyam_members, name="api"),
    path('deposit', views.deposit_history, name="api"),
    path('history',views.show_aikyam_deposit_history, name="api"),
    path('monthly',views.show_monthly_summary, name="api"),
    path('indivi',views.show_individual_deposit_summary, name="api"),
    path('individual-history/<str:first_name>/', views.show_individual_deposit_total_summary, name='api'),




]

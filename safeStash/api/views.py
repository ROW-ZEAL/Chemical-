from django.shortcuts import render
from rest_framework.decorators import api_view
from .api_aikyam import *
from .api_membrs import *
from .api_deposit import *
from .api_deposite_history import *
from .api_monthly_summary import *
from .api_individual_contro import *
from .api_individual_summary import *
from .api_select_users import *
from .api_edit_members import *
from .api_delete_member import *
from rest_framework.response import Response


@api_view(['Get'])
def show_aikyam_member(request):
    return Response(api_aikyam_get_member_list(request=request))



@api_view(['Get'])
def show_aikyam_deposit_history(request):
    return Response(api_aikyam_get_deposit_history(request=request))


@api_view(['Get'])
def show_monthly_summary(request):
    return Response(api_aikyam_get_monthly_deposit_history(request=request))

@api_view(['Get'])
def show_individual_deposit_summary(request):
    return Response(api_aikyam_get_individual_saving(request=request))

@api_view(['GET'])
def show_individual_deposit_total_summary(request, first_name):
    return Response(api_aikyam_get_individual_deposit_history(request=request,first_name=first_name))

@api_view(['Get'])
def show_selected_user(request, id):
    return Response(api_select_users (request=request,id=id))




@api_view(['POST'])
def add_aikyam_members(request):
    return Response(api_add_members(request.data))

@api_view(['POST'])
def edit_aikyam_members(request):
    return Response(api_edit_members(request.data))

@api_view(['POST'])
def delete_aikyam_members(request):
    return Response(api_delete_members(request.data))


@api_view(['POST'])
def deposit_history(request):
    return Response(api_deposit_history(request.data))


@api_view(['POST'])
def individual_history(request):
    return Response(api_individual_history(request.data))

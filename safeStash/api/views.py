from django.shortcuts import render
from rest_framework.decorators import api_view
from .api_aikyam import *
from .api_membrs import *
from .api_deposit import *
from .api_deposite_history import *
from .api_monthly_summary import *
from .api_individual_contro import *
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


@api_view(['POST'])
def add_aikyam_members(request):
    return Response(api_add_members(request.data))


@api_view(['POST'])
def deposit_history(request):
    return Response(api_deposit_history(request.data))

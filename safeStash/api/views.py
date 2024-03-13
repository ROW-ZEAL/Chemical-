from django.shortcuts import render
from rest_framework.decorators import api_view
from .api_aikyam import *
from .api_membrs import *
from rest_framework.response import Response


@api_view(['Get'])
def show_aikyam_member(request):
    return Response(api_aikyam_get_member_list(request=request))






@api_view(['POST'])
def add_aikyam_members(request):
    return Response(api_add_members(request.data))

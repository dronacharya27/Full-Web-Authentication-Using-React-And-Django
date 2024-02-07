from django.shortcuts import render
from rest_framework import viewsets,response,status
from rest_framework.decorators import action
from .serializers import CreateUserSerializer
from .models import User
from rest_framework_simplejwt.tokens import RefreshToken
import json
from datetime import timedelta
from ipaddress import IPv4Address,IPv6Address
import random
from rest_framework.response import Response
from django.utils import timezone
import datetime
from django.core.mail import send_mail

from validate_email import validate_email


class UserViewSet(viewsets.ModelViewSet):
    queryset= User.objects.all()
    serializer_class = CreateUserSerializer

    def verify_email(self,request):
        if(request.method =='POST'):
            email = request.data.get('email')
            if not email:
                return Response({"message":"Email Required"},status=status.HTTP_400_BAD_REQUEST)
            is_valid = validate_email(
                email_address=email,
                check_format=True,
                check_blacklist=False,
                check_dns=True,
                dns_timeout=10,
                check_smtp=True,
                smtp_timeout=10,
                smtp_from_address='dummy.2708.1@gmail.com',
                smtp_skip_tls=False,
                smtp_tls_context=None,
                smtp_debug=False,
                address_types=frozenset([IPv4Address, IPv6Address]))
            print(is_valid)
            if(is_valid):
                return Response(status=status.HTTP_200_OK)
            else:
                return Response({"message":"Email Does not Exist"},status=status.HTTP_404_NOT_FOUND)
    def google_save_data(self,request):
        if(request.method=='POST'):
            existing_user = User.objects.filter(email=request.data.get('email')).first()
        
            if(existing_user):
                    refresh = RefreshToken.for_user(existing_user)
                    print(refresh)
                    access = str(refresh.access_token)
                    
                    return response.Response({"refresh":str(refresh),"access":access},status=status.HTTP_200_OK)
            else:
                serializer = CreateUserSerializer(data=request.data)
                if(serializer.is_valid()):
                    new_user=serializer.save()
                    new_user = User.objects.get(email = new_user)
                    new_user.is_active=True
                    new_user.save()
                    refresh = RefreshToken.for_user(new_user)
                    access = str(refresh.access_token)
                    return response.Response({"data":str(new_user),"access":access,"refresh":str(refresh)},status=status.HTTP_200_OK)
                return response.Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    def otp_login(self,request):
        if(request.method=='POST'):
            email = request.data.get('email')
            if not email:
                return Response({"message":"Email Required"},status=status.HTTP_400_BAD_REQUEST)
            
            user = User.objects.filter(email=email).first()
            if not user:
                return Response({"message":"No User Found with current details"},status=status.HTTP_404_NOT_FOUND)

            otp = random.randint(1000,9999)
            otp_expiry = timezone.now()+ timedelta(minutes=15)

            user.otp = otp
            user.otp_expiry = otp_expiry
            user.max_otp_try = 3
            user.save()
            send_mail(
                'Your OTP',
                f'Otp is {otp}',
                'dummy.2708.1@gmail.com',
                [f'{user.email}']
            )
            return Response({'data':f'{user.id}',
                             'message':'Please Check Your Email'},status=status.HTTP_200_OK)
    @action(detail=True, methods=['PATCH'])
    def verify_otp(self, request, pk=None):
        instance = self.get_object()

        if(
            instance.otp == request.data.get('otp')
            and instance.otp_expiry
            and timezone.now() < instance.otp_expiry
        ):
            instance.is_active = True
            instance.otp_expiry = None
            instance.max_otp_try = 3
            instance.otp_max_out = None
            instance.save()
            send_mail(
            'Account Successfully Verified',
            'Your account has been Verified and Login. Thank you for choosing us.',
            'dummy.2708.1@gmail.com',
            [f'{instance.email}']
                )
            refresh = RefreshToken.for_user(instance)
            print(refresh)
            access = str(refresh.access_token)
                    
            return response.Response({"refresh":str(refresh),"access":access},status=status.HTTP_200_OK)
        return Response({"message":'Wrong or Expired OTP'}, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True,methods=['PATCH'])
    def regenerate_otp(self,request,pk=None):
        instance = self.get_object()

        if int(instance.max_otp_try) == 0 and timezone.now() < instance.otp_max_out:
            return Response(
                "Max OTP try out reach, try again after 30 Minutes",
                status=status.HTTP_400_BAD_REQUEST
            )
        otp = random.randint(1000,9999)
        otp_expiry = timezone.now() + datetime.timedelta(minutes=15)
        max_otp_try = int(instance.max_otp_try) - 1

        instance.otp = otp
        instance.otp_expiry = otp_expiry
        instance.max_otp_try = max_otp_try

        if(max_otp_try==0):
            instance.otp_max_out = timezone.now() + datetime.timedelta(minutes=30)
            return Response(
            {"Message":f"You have Reached the limit of Resend, Please try again after {datetime.timedelta(minutes=30)}"},status=status.HTTP_200_OK
        )
        elif(max_otp_try==-1):
            instance.max_otp_try = 3
        else:
            instance.otp_max_out = None
            instance.max_otp_try = max_otp_try
        instance.save()
        send_mail(
            'Your OTP for account verification',
            f'Otp is {otp}',
            'dummy.2708.1@gmail.com',
            [f'{instance.email}']
        )
        return Response(
            'Successfully regenerated otp',status=status.HTTP_200_OK
        )

        
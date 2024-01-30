from djoser.serializers import UserCreateSerializer
from .models import User
from datetime import timedelta
from django.core.mail import send_mail
from django.utils import timezone
import random
from ipaddress import IPv4Address,IPv6Address
from validate_email import validate_email
from rest_framework.serializers import ValidationError
class CreateUserSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ['id','email','name','password']
        extra_kwargs = {
            'password':{'write_only':True}
        }
    # def validate(self, data):
    #     email = data['email']
    #     is_valid = validate_email(
    #             email_address=email,
    #             check_format=True,
    #             check_blacklist=True,
    #             check_dns=True,
    #             dns_timeout=10,
    #             check_smtp=True,
    #             smtp_timeout=10,
    #             smtp_from_address='dummy.2708.1@gmail.com',
    #             smtp_skip_tls=False,
    #             smtp_tls_context=None,
    #             smtp_debug=False,
    #             address_types=frozenset([IPv4Address, IPv6Address]))
    #     print(is_valid)
    #     if(is_valid==False):
    #         raise ValidationError("Email Doesn't Exist")     
       
    #     return data
    def create(self, validated_data):
        otp = random.randint(1000,9999)
        otp_expiry = timezone.now()+ timedelta(minutes=15)
        user = User(
            email = validated_data['email'],
            otp=otp,
            otp_expiry=otp_expiry,
            max_otp_try=5
        )
        user.set_password(validated_data['password1'])
        user.save()
        send_mail(
            'Your OTP',
            f'Otp is {otp}',
            'dummy.2708.1@gmail.com',
            [f'{validated_data["email"]}']
        )
        return user
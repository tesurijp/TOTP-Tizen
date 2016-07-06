# TOTP-Tizen
TOTP client for Tizen (Gear S/S2)

# Setup
 1. Find 'TOTP' in GalaxyApps and Install this.
 1. You need create key info "auth_keyinfo.txt" like following:  
  Service1:Account_A:JBSWY3DPEHPK3PXP  
  Service2:Account@B:JBSWY3DPEHPK3PXP  
  Service3:AccountC:JBSWY3DPEHPK3PXP  
  ....
  
  Service1/2/3 is service name (eg. Google/Microsoft)  
  Account?? is account in service. (eg. your@mail.com) 
  last JBSW... is TOTP secret key.  
  service name/ account is just label. It is not related to the calculation of TOTP.  
 1. Push the file to GEARS2://documents/auth_keyinfo.txt 

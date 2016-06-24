# TOTP-Tizen
TOTP client for Tizen (Gear S)

# setup
You need change key info.  
 1. Open index.html
 1. Goto info list and edit it.  
  Service1/2/3 is service name (eg. Google/Microsoft)  
  Account?? is account in service.  
  last JBSW... is TOTP secret key.  
```
  <pre class="key">Service1:Account_A:JBSWY3DPEHPK3PXP</pre>
  <pre class="key">Service2:Account@B:JBSWY3DPEHPK3PXP</pre>
  <pre class="key">Service3:AccountC:JBSWY3DPEHPK3PXP</pre>
```

service name/ account is just label.
It is not related to the calculation of TOTP.

# build&amp;install
You can build and install with Tizen-ide.

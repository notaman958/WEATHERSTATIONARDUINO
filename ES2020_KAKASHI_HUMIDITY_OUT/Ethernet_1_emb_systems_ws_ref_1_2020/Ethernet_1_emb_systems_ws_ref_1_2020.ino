
//
//    Alyk  jatko course 2020       29.1.2020 KN
//    Voltage and freq mode 
//    Ethernet (1) module with W5100   / RED module



#include <LiquidCrystal.h>                            // include LCD library

//#include <Ethernet2.h>                              // include Ethernet libarty W5500 library
#include <Ethernet.h>                                 // incluide Ethernet library W5100

#include <PubSubClient.h>                             // include MQTT library      
#include <TimerOne.h>                                 // include timer library




//                   RS  E   D4  D5  D6  D7
LiquidCrystal lcd(37, 36, 35, 34, 33, 32);            // LCD pin wiring settings
//   LiquidCrystal lcd(8,  7,  6,  5,  4,  3); 

                                                      
EthernetClient ethClient;                               // Ethernet object var  

 
/////////////////////////////////////////////////////////////////////////////////////////////  
///           MAC nro                                                                      //
/// 
#define  mac_6    0x73     ///     Last mac number  MSB mac numbers at ethernet_mega.c    ///
                           //      Not relevat with Ethershield  
static uint8_t mymac[6] = { 0x44,0x76,0x58,0x10,0x00,mac_6 };
                                                                                          ///

/////////////////////////////////////////////////////////////////////////////////////////////
//
//  MQTT settings
//
////////////////////////////////////////////////////////////////////////////////////////////
 
 unsigned int localPort = 1883;                       //  MQTT port number
 char* deviceId     = "2020a72145";                   // * set your device id (will be the MQTT client username) 
 
 char* clientId     = "a77145";                       // * set a random string (max 23 chars, will be the MQTT client id) 
 char* deviceSecret = "tamk1";                        // * set your device secret (will be the MQTT client password) 

                                                      // MQTT Server settings  

// byte server[] = { 192,168,8,101 };                   // HOME IP      MQTT server address 
 byte server[] = { 10,10,206,150 };                 // TAMK IP
  
void callback(char* topic, byte* payload, unsigned int length); // subscription callback for received MQTTT messages   

PubSubClient client(server, localPort, callback, ethClient);   // mqtt client 


//////////////// MQTT topic names  ///////////////////////////

 #define inTopic    "ICT_in_2018"                    // * MQTT channel where data are received 
 #define outTopic   "ICT_out_2018"                   // * MQTT channel where data is send 


/////////////////////////////////// Used input pins  ////////////////////////


 #define int_pin 2                                // pulse counting pin 2 = INTx

 #define volts_in_pin A7                           // AD input pin = A7
 #define light_in_pin A7                           // AD input pin = A7
 #define mode         A0                           // mode pin 
 #define volt_m       A1                           // volt mode = A1
 #define freq_m       A2                           // volt mode = A2
 
////////////////////////// volatile variables //////////////////////////////
 volatile long frq=0;
 
 volatile byte i_time=0;

 volatile long puls; 
 

//////////////////////////  variables //////////////////////////////

 boolean mqtt_mode=false;
 boolean volt_mode=false;
 boolean freq_mode=false;  

                                 

////////////////////////////////////////////////////////////////////////////////////////////////////////
///
///                               SETUP section
///
///////////////////////////////////////////////////////////////////////////////////////////////////////


void setup() {
  // put your setup code here, to run once:

    Serial.begin(9600);                                 // Serial monitor baudrate  = 9600

    pinMode(int_pin,INPUT);                               // Counting Pin 2 as input

    attachInterrupt(digitalPinToInterrupt(int_pin), pulse_0, RISING);    // interrupt routine defination

    Timer1.initialize(500000);         // initialize timer1, and set a 1/2 second period
   //Timer1.initialize(50000);   // period 50 ms
   Timer1.attachInterrupt(Timer_int_routine);  // attaches callback() as a timer overflow 

  
    lcd.begin(20,4);                                    // Display size defination 20 char  4 row
   
    lcd.setCursor(0,0);                                 // set curosor to left upper corner
    //         01234567890123456789
    lcd.print("28.1.2020 Alyk jatk ");                  // print to lCD 

    Serial.println("Start 28.1.2020");                   // print to serial monitor

    DDRF=0x00;                                           // F-port as Input                                             
    PORTF=0x0F;                                          // low 4 pins PULL UPs > ON

    read_mode();                                         // read mode pins



    delay(500);

    
      fetch_IP_mode();                                         // initialize Ethernet connection
                                                          // get IP number from DHCP
    
      Connect_MQTT_mode();                              // connect to MQTT server    

  
}

///////////////////////////////////////////////////////////////////////////////////////////////////
///
///                           LOOP section
///
///////////////////////////////////////////////////////////////////////////////////////////////////

void loop() {
  
                                                        //  main code here 


 while(true)                                            // contious loop
 {   
  
    if(mqtt_mode==true)                                     // is MQTT activated ?
    {
        client.loop();                                      // keep MQTT connection onlin
    }



    if (volt_mode==true)                                    // Is volt mode activated
      {
          print_volts(0,1);
      }


    if (freq_mode==true)                                    // Is freq mode activated
      {
        print_herz(0,2);
      }
 


     delay(1500);
     
 }  // while end


}

//////////////////////////////////////////////////////////////////////////////////////////////
///
///    LOOP END
///
/////////////////////////////////////////////////////////////////////////////////////////////




/////////////////////////////////////////////////////////////////////////////////////////////
void print_air_pres(int x, int y)              // AIP
{
  
      Serial.println(" Hello Air pressure ");
  
}


/////////////////////////////////////////////////////////////////////////////////////////////
void print_volts(int x, int y)                  // Volts
{
    float vlts=ad_volts(volts_in_pin);

    lcd.setCursor(x,y); 
                    // 4.75 V
    lcd.print("Voltage=      ");
  
    lcd.setCursor(x,y); 
    lcd.print("Voltage= ");
    lcd.print(vlts,1);                                  // print scaled value to LCD
    lcd.print(" V");

    Serial.print("Voltage");                             // print voltage to serial monitor
    Serial.print(vlts,1);
    Serial.println("V");
    
   send_json_message_mode("Voltage",vlts,"V");
   
}


/////////////////////////////////////////////////////////////////////////////////////////////
float ad_volts(char s[])
{

    int meas=analogRead(s);                      // read AD converter value, put readed value to variable meas

    float volts;

    volts=meas*5.0;
    volts=volts/1023;                                    // scale meas value to 0.0-5.0
    
    return volts;
}


////////////////////////////////////////////////////////////////////////////////////
void print_herz(int x, int y)   ///             Freq
{
 float puls_freq, spd_float;

    lcd.setCursor(x,y);                        
    //         01234567890123456789
    //               10123 Hz
    lcd.print("Freg=         ");                   // clear  row
    
  lcd.setCursor(x,y);
           //1234567890123456 
  lcd.print("Freq= ");
   
  
  puls_freq=(float)frq/10;
       
  lcd.setCursor(x+6,y); 
  lcd.print(puls_freq,0);
  lcd.print(" Hz");
 
    send_json_message_mode("Freq",puls_freq,"Hz"); 
}







//////////////////////////////////////////////////
//////
//////    Ethernet
//////
/////////////////////////////////////////////////
////////////////////////////////////////////////////////
///////////
///////////    Ethernet routines
///////////
///////////////////////////////////////////////////////

///////////////////////////////////////////
//////// GET IP number from DHCP server
//////////////////////////////////////////

void fetch_IP_mode()
{

      if(mqtt_mode==true)
      { fetch_IP();}
}


void fetch_IP(void)
{
byte rev=1;



  lcd.setCursor(0,0);

  //         01234567890123456789  
  lcd.print("     Waiting IP     ");

  rev=Ethernet.begin( mymac);                  // get IP number
     
  Serial.print( F("\nW5100 Revision ") );
    
  if ( rev == 0){
                   
                      Serial.println( F( "Failed to access Ethernet controller" ) );
                   
                                                // 0123456789012345689 
                    lcd.setCursor(0,0); lcd.print(" Ethernet failed   ");
                 }    
                 
              
     Serial.println( F( "Setting up DHCP" ));
     Serial.print("Connected with IP: "); 
     Serial.println(Ethernet.localIP()); 


  lcd.setCursor(0,0);
  //         012345678901234567890
  lcd.print("                     ");
  
  lcd.setCursor(0,0);
  lcd.print("myIP=");
  lcd.print(Ethernet.localIP());
  delay(1500);

  
}

/////////////////////////////////////////////////////////////////////////////////
//////////////// MQTT Routines
///////////////////////////////////////////////////////////////////////////////


                                                              // Send message

///////////////////////////////////////////////////////////////////////////////
////////
///////       Send JSON
///////
//////////////////////////////////////////////////////////////////////////////



void send_json_message_mode(String s_name, float measured_value, String unit )
{
if(mqtt_mode==true)
{

  send_json_message(s_name, measured_value, unit );
}
}


void send_json_message(String s_name, float measured_value, String unit )
{
    char bufa[130];
    long data;
    char sg;

                
//    sprintf(bufa,"IOTJS={\"S_path\",\"ch1\",\"S_name\":\"Temp1\",\"S_value\":15.767}");               // test message with header and data
  

  char str_temp[10];
  char str_s_name[10];
  char str_unit[5];

  
  s_name.toCharArray(str_s_name,s_name.length()+1); 
  unit.toCharArray(str_unit,unit.length()+1); 

  /* 4 is mininum width, 2 is precision; float value is copied onto str_temp*/
  dtostrf(measured_value, 4, 2, str_temp);
//              000000000+111111111+222222222+333333333+444444444+555555555+666666666+777777777+888888888+999999999+AAAAAAAAA+BBBBBBBBBB  
//              012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789
  sprintf(bufa,"IOTJS={\"S_path\":\"ch1\",\"S_name\":\"%s\",\"S_value\":%s,\"S_unit\":\"%s\",\"S_data\":\" Alyk jatk\"}",str_s_name,str_temp,str_unit);               // create message with header and data
  
    ///////  
    //////
    //////  Message syntax     "IOTJS=<JSON>"                   
    ///                       
    /////                     
    /////                       
    
 
   Serial.println( bufa );                              //  Print message to serial monitor
     
   if (client.connected()) 
     
  { 
        client.publish(outTopic,bufa);                        // send message to MQTT server        
  }
  else
  {                                                           //   Re connect if connection is lost
    delay(500);

           lcd.setCursor(0,0);
                  //  012345678901234567890
           lcd.print("   RE Connecting    ");                // Re Connection 
         
              Serial.println(" RE Connecting" );

      client.connect(clientId, deviceId, deviceSecret);
        
      delay(1000);                                            // wait for reconnecting
  }
  
}



                                                       // Receive incoming MQTT message   
 
 void callback(char* topic, byte* payload, unsigned int length) 
 { 
                                                      // copu the payload content into a char* 
   char* receiv_string; 
   receiv_string = (char*) malloc(length + 1); 
   memcpy(receiv_string, payload, length);           // copy received message to receiv_string 
   receiv_string[length] = '\0';           
    
       lcd.setCursor(0,0);
       //         01234567890123456789
       lcd.print("Mess=               ");
       
       lcd.setCursor(5,0);
       lcd.print(receiv_string);                      // print reveived message to LCD

       Serial.println( receiv_string );
       
   free(receiv_string); 
 } 


                                                    //  MQTT server connection  
void Connect_MQTT_mode()
{
    if(mqtt_mode==true)
    {
        Connect_MQTT_server(); 
    };
}

 
 void Connect_MQTT_server() 
 { 
 
                                         
              Serial.println(" Connecting to MQTT" );
              Serial.print(server[0]); Serial.print(".");     // Print MQTT server IP number to Serial monitor
              Serial.print(server[1]); Serial.print(".");
              Serial.print(server[2]); Serial.print(".");
              Serial.println(server[3]); 
         

            lcd.setCursor(0,0);
            //         012345678901234567890
            lcd.print("                     ");
            
            lcd.setCursor(0,0);
            lcd.print("MQTT=");
            lcd.print(server[0]);lcd.print(".");              // Print MQTT server IP number to LCD
            lcd.print(server[1]);lcd.print(".");
            lcd.print(server[2]);lcd.print(".");
            lcd.print(server[3]);
            
            delay(500);


   if (!client.connected())                                    // check if allready connected  
     { 
                                                              // connection to MQTT server 
      if (client.connect(clientId, deviceId, deviceSecret)) 
        { 
           lcd.setCursor(0,0);
           lcd.print("Conn");                                 // Connection is OK
         
            Serial.println(" Connected OK " );
                                           
            client.subscribe(inTopic);                        // subscript to in topic        
        } 
     else
        {
           lcd.setCursor(0,0);
           //         01234567890123456789
           lcd.print("  MQTT Error        ");                                 // error in connection

           Serial.println(" MQTT Connection ERROR " );
     
        }    
    } 
    
 }

/////////////////////////////////////////////
void read_mode()                                //  read mode pins
{

  if ( analogRead(mode)< 500){ mqtt_mode=true; }
 
  if ( analogRead(volt_m) < 500){ volt_mode=true; }
 
  if ( analogRead(freq_m) < 500){ freq_mode=true; }
 
  
}



/////////////////////////////////////////////
//
//     input pin interrupt routine
//
/////////////////////////////////////////////
///////////////////////////////////////
///// Interrupt service
//////////////////////////////////////
///// D2 int routine
//////////////////////////////////////
void pulse_0(void)
{

   puls++;  
  
}
//////////////////////////////////////
////////////////////////////////////////
/////////    Timer int routine
//////////////////////////////////////


void Timer_int_routine()  // Interrupt routine with Arduino IDE syntax

{
  
    i_time++;
  
   if(i_time>19){ i_time=0; frq=puls; puls=0; };


}

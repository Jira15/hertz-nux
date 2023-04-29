import { defineStore } from 'pinia'   
import { createProxyMiddleware }from 'http-proxy-middleware' 
import axios from 'axios';


export const useCheckingStore = defineStore('checking',   {  
    
  state: () => ({
    responseData: null,
  }),
  actions: { 
 async fetchData() {   
  const xmlData = `
  <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:bars-com:thrpanama-otavehavailrate:OTAVehAvailRate">
  <soapenv:Header/>
  <soapenv:Body>
  <urn:otavehavailrate>
  <urn:pcMessage>
  <![CDATA[<OTA_VehAvailRateRQ xmlns="http://www.opentravel.org/OTA/2003/05" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opentravel.org/OTA/2003/05 OTA_VehAvailRateRQ.xsd" Version="1.002">
  <POS>
  <Source>
  <RequestorID ID='webthrifty' MessagePassword='wZutNUCZ53g7' />
  </Source>
  </POS> 
  <VehRentalCore PickUpDateTime="2023-12-15T14:45:00" ReturnDateTime="2023-12-16T14:45:00">
  <PickUpLocation LocationCode="V ESPANA"/>
  <ReturnLocation LocationCode="V ESPANA"/>
  </VehRentalCore>
  <VehPrefs>
    <VehPref>
      <VehClass Size="EDAR"/>
      <VehClass Size="CDAR"/> 
    </VehPref>
  </VehPrefs>

  </VehAvailRQCore>
  </OTA_VehAvailRateRQ>]]>
  </urn:pcMessage>
  </urn:otavehavailrate>
  </soapenv:Body>
  </soapenv:Envelope>
`;
      try {
        // const response = await fetch('/thrpanama/soap', {
        //   method: 'POST',
        //   headers: { 
        //     'Content-Type': 'text/xml;charset=UTF-8',
        //     'SOAPAction': 'otavehretres', // Set the SOAPAction if required by your endpoint
        //   },
        //   body: xmlData,
        // });

      
      

      let xmlhttp = new XMLHttpRequest();
      xmlhttp.open('POST', '/thrpanama/soap', true);
      xmlhttp.setRequestHeader('Content-Type', 'text/xml'); 
      xmlhttp.setRequestHeader('Accept', 'text/xml'); 
      xmlhttp.setRequestHeader('SOAPAction', 'otavehavailrate');

 


        xmlhttp.onreadystatechange = function () {
          if (xmlhttp.readyState == 4) { 
            if (xmlhttp.status == 200) {
              console.log(xmlhttp.responseText);
            }
          }
        };


        xmlhttp.send(xmlData);
 
        // const response = await axios.post('/thrpanama/soap', xmlData, {
        //   method: 'POST',
        //     headers: {
        //     'Content-Type': 'text/xml;charset=UTF-8',    
        //     'Accept': '*/*',
        //     'Accept-Encoding': 'gzip, deflate, br',
        //     'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        //     'SOAPAction': 'otavehavailrate',
        //     'Access-Control-Allow-Origin': '*',
        //     'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS', 
        //     'Connection': 'keep-alive',
        //     }, 
        // });


        
        // const responseText = await response.data;

        // console.log('Data:', responseText); 
        // let respuesta =  responseText;
  
     
        // if (respuesta.readyState == 4) { 
        //   console.log('readyState:works');

        // }
 
        // console.log('Response:', response);
        // const responseData = await response; // or response.json() if your server returns JSON
        // this.responseData = responseData;
      } catch (error) {
        // console.error('Error:', error);

        if (error.response) {
          console.error('Response status:', error.response.status);
          console.error('Response headers:', error.response.headers);
          console.error('Response data:', error.response.data);
        } else {
          console.error('Error:', error.message);
        }
      }
    },
  },
}); 



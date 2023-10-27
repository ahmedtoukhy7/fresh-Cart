import axios from 'axios'
import React, { useEffect } from 'react'

export default function Notes() {

    let headers={
        token:eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2JhY2stbm90ZXMuZ2VuZXJhbGhvdXNlc2VydmljZXMuY29tL2FwaS9sb2dpbiIsImlhdCI6MTY5NTY3ODc1MywiZXhwIjoxNjk1NjgyMzUzLCJuYmYiOjE2OTU2Nzg3NTMsImp0aSI6IldGMmM4VDFDcUs4eDFRc2wiLCJzdWIiOiIzIiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.tGuDDyhjO0xbod9S6mIKWNZRM3Iear8a425fJMYqwC0
    }

    useEffect(()=>{
        Notes()
    },[])

    function Notes(){
        let {data}= axios.get('https://back-notes.generalhouseservices.com/api/note',{
            headers:headers

        })

        console.log(data)
    }






  return <>


  
  
  
  </>
}

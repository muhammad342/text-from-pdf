import * as PDFJS from 'pdfjs-dist'
// import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry'
import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Document, Page } from 'react-pdf';


PDFJS.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS.version}/pdf.worker.js`;


function App() {
  const [text, setText] = useState('');
  const fileURL = 'src/assets/Test.pdf';

  const handlefunc=async()=>{
    const pdf = await PDFJS.getDocument(fileURL).promise
    const pdfLength = pdf.numPages;
    let finalItteration =pdfLength;
let content = null;
    for (let i = 0; i <= pdfLength; i++) {
      
      if (finalItteration > i) {
        continue
      }
        const page = await pdf.getPage(i)
        const textcontent = await page.getTextContent()
        content = textcontent.items.map((s) => {
          return s.str
        }).join(' ')  
      }
       setText(content)
    }
      useEffect(()=>{
        handlefunc()
      },[])
  
  return (
    <div>
     <p>Extracted text:</p>
     <p>{text}</p>
  </div>
  )
}

export default App

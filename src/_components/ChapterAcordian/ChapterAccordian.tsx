import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { useState } from "react";
  
  export function AccordionDemo({chapter}:{chapter:any}) {
    const [parsedResult, setParsedResult] = useState<any>(JSON.parse(chapter.parsedResult));
    console.log(chapter.videoLink)

    return (
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="flex flex-col">
            <h1 className="text-primary text-xl font-bold">{parsedResult.Chapter_Name}</h1>
            <p className="text-gray-400 text-xs">
                {
                   parsedResult.about
                }
            </p>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex justify-center items-center">
            <iframe src={chapter.videoLink} className="w-[80%] md:h-[70vh]" ></iframe>
            </div>
            {
                parsedResult.topics.map((topic:any,index:number)=>{
                    return(
                        <div className="flex flex-col gap-4">
                            <h1 className=" text-xl font-bold">{topic.title}</h1>
                            <p className="text-gray-400 text-xs">
                                {topic.explanation}
                            </p>
                        </div>
                    )


                })
            }
            {/* <iframe src={chapter.videoLink} frameborder="0"></iframe> */}
          </AccordionContent>
        </AccordionItem>
      
      </Accordion>
    )
  }
  
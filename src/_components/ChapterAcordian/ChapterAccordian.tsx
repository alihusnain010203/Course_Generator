import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  
  export function AccordionDemo(chapter:any) {
    console.log(chapter)
    return (
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="flex flex-col">
            <h1 className="text-primary text-xl font-bold">{chapter.chapter.Chapter_Name}</h1>
            <p className="text-gray-400 text-xs">
                {
                    chapter.chapter.about
                }
            </p>
          </AccordionTrigger>
          <AccordionContent>
            
            {
                chapter.chapter.topics.map((topic:any,index:number)=>{
                    return(
                        <div className="flex flex-col gap-4">
                            <h1 className=" text-xl font-bold">{topic.title}</h1>
                            <p className="text-gray-400 text-xs">
                                {topic.description}
                            </p>
                            {topic.code && <pre>
                           <code>
                                {topic.code}
                                </code>
                        </pre>}
                        </div>
                    )


                })
            }
          </AccordionContent>
        </AccordionItem>
      
      </Accordion>
    )
  }
  
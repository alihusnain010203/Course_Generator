import {
    AlertDialog as UIAlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Image from "next/image"

export function CustomAlertDialog({loading,text}:{
    loading:boolean,
    text:string
}) {
    return (
        <UIAlertDialog open={loading}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{text}</AlertDialogTitle>
                    <AlertDialogDescription className="flex justify-center items-center">
                        <Image src="/rocket.gif" alt="loading" width={100} height={100} />
                    </AlertDialogDescription>
                </AlertDialogHeader>
               
            </AlertDialogContent>
        </UIAlertDialog>
    )
}

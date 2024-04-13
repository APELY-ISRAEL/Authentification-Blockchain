"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useContext } from "react";



import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { StateContext } from "@/components/Provider"
import { Loader } from "lucide-react";



const formSchema = z.object({
    address: z.string().min(42, {
        message: "Address must be at least 43 characters.",
    }),

    typeOp: z.string({
        required_error: "Please select a type.",
    }),



})

export default function VerifierForm() {

    const { toast } = useToast()
    const { contract, provider, signer } = useContext(StateContext)
    const [isLoading, setIsLoading] = React.useState<boolean>(false);


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            address: "",
            typeOp: ""
        },

    })

    async function grantRole(address: string,) {
        const issuer = await contract?.grantIssuerRole(address)
    }
    async function revokeRole(address: string,) {
        const issuer = await contract?.revokeIssuerRole(address)
    }

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)
        const updatedValues = {
            ...values

        }
        console.log(updatedValues);
        const request = await fetch('/issuers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedValues),
        }).then(async response => {
            if (response.ok) {
                const op = await response.json();
                console.log('object:', op);
                if (op.typeOp == 'GrantRole') {
                    grantRole(op.address)
                    toast({
                        description: "Role granted.",
                    })
                } else {
                    revokeRole(op.address)
                    toast({
                        description: "Role revoked.",
                    })
                }
                setIsLoading(false)
            }
            else {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "There was a problem with your request.",
                    action: <ToastAction altText="Try again">Try again</ToastAction>,
                })
                setIsLoading(false)
            }
        })
        console.log(request)
        form.setValue("address", "Select operation type");
        form.reset();
    }
    return (
        <main className=" w-[55rem] h-[28rem] flex justify-center items-center flex-col">
            <h1 className="text-5xl mb-8 font-bold ">GRANT OR REVOKE ISSUER ROLE</h1>
            <Form {...form}>
                <form className="w-[50rem]" onSubmit={form.handleSubmit(onSubmit)} >

                    <div className="flex flex-row gap-2  mb-2">
                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <Input placeholder="Address" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex flex-row gap-2">
                        <FormField
                            control={form.control}
                            name="typeOp"
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger className="w-[800px] mb-2">
                                        <SelectValue placeholder="Select operation type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Type</SelectLabel>
                                            <SelectItem value="GrantRole">Grant Role</SelectItem>
                                            <SelectItem value="RevokeRole">Revoke Role</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </div>
                    <div className="w-full flex justify-end">
                        <Button className="w-44 " onClick={() => { }} type="submit">
                            {isLoading ? <Loader className="animate-spin" /> : "Submit"}
                        </Button>
                    </div>
                </form>
            </Form>
        </main>
    )
}

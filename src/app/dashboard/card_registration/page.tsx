"use client"
import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"


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

const formSchema = z.object({
    Idnum: z.string(),
    firstname: z.string().min(2, {
        message: "Firstname must be at least 3 characters.",
    }),
    lastname: z.string().min(2, {
        message: "Lastname must be at least 3 characters.",
    }),
    city: z.string().min(2, {
        message: "City must be at least 3 characters.",
    }),

    profession: z.string().min(2, {
        message: "Profession must be at least 3 characters.",
    }),
    gender: z.string({
        required_error: "Please select a gender.",
    }),
    image: z.string({
        required_error: "Please select a image.",
    }),


})

export default function ProfileForm() {
    const [birthDate, setBirthDate] = React.useState<Date>()
    const [madeDate, setMadeDate] = React.useState<Date>()
    const [expireDate, setExpireDate] = React.useState<Date>()
    const { toast } = useToast()

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            Idnum: "",
            firstname: "",
            lastname: "",
            city: "",
            gender: "",
            profession: "",
            image: ""
        },

    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const updatedValues = {
            ...values, birthDate: birthDate, madeDate: madeDate, expireDate: expireDate
        }
        console.log(updatedValues);
        const request = await fetch('/files', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedValues),
        }).then(response => {
            if (response.ok) {
                toast({
                    description: "Your card has been saved.",
                })
            }
            else {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "There was a problem with your request.",
                    action: <ToastAction altText="Try again">Try again</ToastAction>,
                })

            }
        })
        
        console.log(request);
        setBirthDate(undefined);
        setMadeDate(undefined);
        setExpireDate(undefined);
        form.setValue("gender", "Select a gender");
        form.reset();
    }

    return (
        <main className=" w-[55rem] h-[28rem] flex justify-center items-center flex-col">
            <h1 className="text-6xl mb-8 font-bold ">ID CARD REGISTRATION</h1>
            <Form {...form}>
                <form className="w-[50rem]" onSubmit={form.handleSubmit(onSubmit)} >
                    <div className="flex flex-row gap-2 mb-2 ">
                        <FormField
                            control={form.control}
                            name="Idnum"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <Input className="text-black" placeholder=" Id Card Number " {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex flex-row gap-2  mb-2">
                        <FormField
                            control={form.control}
                            name="firstname"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <Input placeholder="First Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="lastname"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <Input className="text-black" placeholder="Last Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex flex-row gap-2">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-[800px] justify-start text-left font-normal mb-4",
                                        !birthDate && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {birthDate ? format(birthDate, "PPP") : <span>Birth Date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={birthDate}
                                    onSelect={setBirthDate}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                        <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <Input className="text-black" placeholder="Birth City" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex flex-row gap-2">
                        <FormField
                            control={form.control}
                            name="gender"
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger className="w-[800px] mb-2">
                                        <SelectValue placeholder="Select a gender " />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Gender</SelectLabel>
                                            <SelectItem value="Male">Male</SelectItem>
                                            <SelectItem value="Female">Female</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="profession"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <Input className="text-black" placeholder="Profession" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex flex-row gap-2 mb-1">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-[400px] justify-start text-left font-normal",
                                        !madeDate && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {madeDate ? format(madeDate, "PPP") : <span>Made On</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={madeDate}
                                    onSelect={setMadeDate}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-[400px] justify-start text-left font-normal mb-1",
                                        !expireDate && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {expireDate ? format(expireDate, "PPP") : <span>Expires On</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={expireDate}
                                    onSelect={setExpireDate}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>


                    </div>
                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem className="w-full mb-1">
                                <FormControl>
                                    <Input className="text-black" accept="image/png, image/jpeg, image/gif" type="file" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="w-full flex justify-end">
                        <Button className="w-44 " onClick={() => {

                        }} type="submit">Submit</Button>

                    </div>

                </form>
            </Form>
        </main>
    )
}

'use client'

import { Button } from "@/components/shared/forms/atoms/buttons/Button";
import { FormInput } from "@/components/shared/forms/atoms/customInputs/FormInput";
import { useRouter } from "next/navigation";
import { useState, ChangeEvent } from "react";
import toast from "react-hot-toast";
import { useMediaQuery } from "@mui/material";
import apiService from "@/services/apiService";
import { isEmailValid } from '@/utils/validators/emailValidator';
import Image from "next/image";

export default function NewsletterForm() {
    const isResponsive = useMediaQuery("(max-width: 1024px)");
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [isEmailValidated, setIsEmailValidated] = useState(false);

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newEmail = event.target.value;
        setEmail(newEmail);
        setIsEmailValidated(isEmailValid(newEmail));
    };

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()

            if (!isEmailValidated) {
                toast.error("Please enter a valid email address.");
                return;
            }
            
            const { error } = await apiService.put(
                "waitlist",
                { email }
            );

            if (error) throw error;
            router.replace('/waitlist/confirmation');
        } catch (error: any) {
            toast.error(error);
        }
    }

  return (
    <form className={`bg-[#FFF] rounded-[20px] p-[50px] ${
            isResponsive ? "w-[350px]" : "w-[546px]"
            }`} onSubmit={submit}>
        <div className="flex flex-col items-center justify-center">
            <Image
                src="/imgs/logo-icon.png"
                alt="Icharter-Logo"
                width={59}
                height={60}
                priority
            />
            <h1
                className={`font-[500] text-[#454545] text-center leading-[30px] ${
                    isResponsive ? "mt-[15px] mb-[6px] text-[22px]" : "mt-[30px] mb-[12px] text-[28px]"
                }`}
            >
                Get ready for your next adventure!
            </h1>
            <small className={`font-[400] text-[#333] text-center ${isResponsive ? 'mb-[15px] text-[14px]' : 'mb-[27px] text-[16px]'}`}>
                Join our waitlist to be among the first to experience a better way to list and book fishing charters.
            </small>
        </div>
        <div className="flex flex-col gap-[8px]">
            <label className={`text-[#737473] font-[500] ${isResponsive ? 'text-[14px]' : 'text-[16px]'}`}>
                Email
            </label>
            <FormInput 
                testId="email"
                value={email}
                onChange={handleEmailChange}
                type="email"
                placeholder="Enter Email Address"
                test-id="waitlist_email"
            />
        </div>
        <div>
            <Button 
                disabled={!isEmailValidated}
                text="Join waitlist"
                className={`font-[500] py-[19px] rounded-xl ${
                    isResponsive ? "mt-[15px] w-[250px] text-[16px]" : "mt-[27px] w-[445px] text-[18px]"
                  }`}
                type="submit"
                test-id="waitlist_submit"
            />
        </div>
    </form>
  )
}
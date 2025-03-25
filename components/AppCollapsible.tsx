import React from 'react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp } from "lucide-react"
interface AppCollapsibleType {
    children: React.ReactNode;
    description: string;
    isOpen: boolean;
    onToggle: () => void;
    isShowButtonStyle?: boolean;
    isShowRightIcon?: boolean;
    isTextLarge?: boolean;
    textColor: string,
}
const AppCollapsible: React.FC<AppCollapsibleType> = (props) => {
    return (
        <Collapsible
            open={props.isOpen}
            className={props.isShowButtonStyle ? "border p-2 rounded-md w-full" : "w-full"}>
            <CollapsibleTrigger onClick={props.onToggle} className={cn("flex w-full justify-between items-center", props.isShowButtonStyle && props.isOpen ? "border-b" : "")}>
                <span className={cn(props.isTextLarge ? "font-bold text-xl" : "font-medium text-[10px] w-full text-left", props.textColor)}>{props.description}</span>
                {props.isShowRightIcon &&
                    <>
                        {props.isOpen ?
                            <ChevronUp size={14} className='text-primary' />
                            :
                            <ChevronDown size={14} className='text-primary' />
                        }
                    </>
                }
            </CollapsibleTrigger>
            <CollapsibleContent>
                {props.children}
            </CollapsibleContent>
        </Collapsible>
    );
}

export default AppCollapsible
import { twMerge } from "tailwind-merge";

type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode;
};

export default function Container({ children, className }: ContainerProps) {
    return <div className={twMerge("container xl:max-w-7xl mx-auto px-4", className)}>{children}</div>;
}

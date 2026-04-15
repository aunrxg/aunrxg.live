import SmartTitle from "@/components/SmartTitle";
import CodeBlock from "./CodeBlock";
import Link from "next/link";

export const MDXComponents = {
  h1: (props: any) => (
    <div className="mb-12 mt-8 w-[110%] -ml-[5%]">
      <SmartTitle title={props.children} />
    </div>
  ),
  h2: (props: any) => (
    <h2 className="text-3xl md:text-5xl font-sans font-bold tracking-tight mt-16 mb-6 flex items-center gap-2" {...props}>
      <span className="text-[#c678dd] select-none text-4xl">#</span> {props.children}
    </h2>
  ),
  h3: (props: any) => (
    <h3 className="text-2xl md:text-3xl font-sans font-medium tracking-tight mt-12 mb-4" {...props} />
  ),
  p: (props: any) => (
    <p className="text-lg md:text-xl text-neutral-300 font-light leading-[1.7] mb-6 mix-blend-plus-lighter" {...props} />
  ),
  ul: (props: any) => (
    <ul className="list-disc pl-6 text-lg md:text-xl text-neutral-300 font-light leading-[1.7] mb-6 space-y-2 marker:text-[#e06c75]" {...props} />
  ),
  code: (props: any) => {
    // If it's a block code block, the wrapper handles it. For inline:
    return (
      <code className="bg-[#1e2a1b] text-[#c3e88d] px-1.5 py-0.5 rounded text-[0.9em] font-mono border border-[#2d3a2a]" {...props} />
    );
  },
  pre: (props: any) => {
    return <CodeBlock {...props.children.props} />;
  },
  a: (props: any) => (
    <Link href={props.href || "/"} className="text-[#61afef] underline decoration-[#61afef]/30 hover:decoration-[#61afef] transition-colors" {...props} />
  ),
};

export default function Input(
  props: React.InputHTMLAttributes<HTMLInputElement>
) {
  return (
    <input
      {...props}
      className="flex w-full border-input px-3 py-2 ring-offset-background file:border-0 file:bg-transparent
               file:text-sm file:font-medium file:text-foreground focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50
                 md:text-sm h-14 rounded-xl border-2 bg-card pl-12 pr-12 text-base shadow-lg shadow-primary/5
                  transition-all placeholder:text-muted-foreground focus-visible:border-primary
                   focus-visible:shadow-primary/10"
    />
  );
}

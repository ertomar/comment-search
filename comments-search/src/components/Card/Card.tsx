interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export default function Card(props: CardProps) {
  const { children, className, ...rest } = props;
  return (
    <div
      className={`bg-white rounded-lg shadow-md p-4 border border-gray-200 ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}

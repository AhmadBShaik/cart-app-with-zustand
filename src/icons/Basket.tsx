interface BasketProps extends React.SVGProps<SVGSVGElement> {
  isSelected?: boolean
}

export const Basket: React.FC<BasketProps> = ({ isSelected, ...props }) => {
  return <svg
    width="24"
    height="24"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M6.66667 8.33333H4.16667L2.5 17.5H17.5L15.8333 8.33333H13.3333M6.66667 8.33333V5.83334C6.66667 3.99239 8.15905 2.5 10 2.5V2.5C11.8409 2.5 13.3333 3.99238 13.3333 5.83333V8.33333M6.66667 8.33333H13.3333M6.66667 8.33333V10.8333M13.3333 8.33333V10.8333" stroke={isSelected ? "#FFFFFF" : "#1A1A1A"} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
}

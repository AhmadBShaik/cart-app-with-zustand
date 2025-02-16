
export const CrossRounded: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return <svg
    width="24"
    height="25"
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M12 23.5C18.0748 23.5 23 18.5748 23 12.5C23 6.42525 18.0748 1.5 12 1.5C5.92525 1.5 1 6.42525 1 12.5C1 18.5748 5.92525 23.5 12 23.5Z" stroke="#CCCCCC" strokeMiterlimit="10" />
    <path d="M16 8.5L8 16.5" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 16.5L8 8.5" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
}
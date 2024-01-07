interface Props
  extends Omit<React.SVGProps<SVGSVGElement>, "viewBox" | "fill"> {}
const Logo = ({ width, height = 36, ...props }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 42.98 54.89"
    height={height}
    width={width}
    {...props}
  >
    <defs>
      <linearGradient
        id="a"
        x1="14.17"
        y1="31.78"
        x2="50.8"
        y2="31.78"
        gradientTransform="translate(-12.96 32.28) rotate(-45)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#b51c83" />
        <stop offset="1" stopColor="#00a4b9" />
      </linearGradient>
    </defs>
    <path
      d="M-4.48,33.28h31a10.4,10.4,0,0,1,10.4,10.4v0a0,0,0,0,1,0,0h-31a10.4,10.4,0,0,1-10.4-10.4v0A0,0,0,0,1-4.48,33.28Z"
      transform="translate(-33.28 50.41) rotate(-90)"
      fill="#b51c83"
    />
    <path
      d="M22.19,26.58h31a0,0,0,0,1,0,0v0A10.4,10.4,0,0,1,42.79,37h-31a0,0,0,0,1,0,0v0a10.4,10.4,0,0,1,10.4-10.4Z"
      transform="translate(20.97 -17.95) rotate(45)"
      fill="url(#a)"
    />
    <path
      d="M28.1,19.79h31a10.4,10.4,0,0,1,10.4,10.4v0a0,0,0,0,1,0,0h-31a10.4,10.4,0,0,1-10.4-10.4v0A0,0,0,0,1,28.1,19.79Z"
      transform="translate(62.77 -28.1) rotate(90)"
      fill="#00a4b9"
    />
  </svg>
);
export default Logo;

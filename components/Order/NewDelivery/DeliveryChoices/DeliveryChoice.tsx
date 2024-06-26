import Container from "../../../ui/container";
import { IconType } from "react-icons/lib";
import { FiCheck } from "react-icons/fi";
interface ChoicesProps {
  handleDeliveryOption: (deliveryOption: string) => void;
  deliveryOption: string;
  elementOption: string;
  MainIcon: IconType;
  children?: React.ReactNode;
  className?: string,
}
export const DeliveryChoices: React.FC<ChoicesProps> = ({
  handleDeliveryOption,
  deliveryOption,
  MainIcon,
  elementOption,
  children,
  className,
}) => {
  return (
    <>
      <div
        className="w-full"
        onClick={() => handleDeliveryOption(elementOption)}
      >
        <Container
          className={`${className} flex flex-col  items-center justify-center w-full h-40 md:h-44  rounded-lg p-3 ${
            deliveryOption === elementOption || !deliveryOption
              ? ""
              : "text-slate-300"
          } cursor-pointer`}
        >
          <MainIcon
            className={`text-3xl mb-2 ${
              deliveryOption === elementOption || !deliveryOption
                ? "text-primary-medium"
                : "text-slate-300"
            }`}
          />
          <p className="font-bold text-[12px] md:text-sm text-center">
            {elementOption.toUpperCase()}
          </p>
          {children}
          <span
            className={`flex items-center justify-center mt-1  border border-secondary-color md:h-8 md:w-8 h-6 w-6 rounded-full    ${
              deliveryOption === elementOption
                ? "bg-secondary-color text-white"
                : "hidden"
            }`}
          >
            <FiCheck
              className={`${deliveryOption !== elementOption && "hidden"}`}
            />
          </span>
        </Container>
      </div>
    </>
  );
};

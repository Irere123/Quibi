import React, { ReactNode } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export interface MobileNavContainerProps {
  className?: string;
  children?: ReactNode;
}

export const MobileNavContainer: React.FC<MobileNavContainerProps> = ({
  className,
  children,
}) => {
  return (
    <div
      className={`flex fixed inset-x-0 rounded-t-3xl justify-around items-center bottom-0 w-full h-10 bg-primary-800 border-t border-primary-700 ${className}`}
    >
      {children}
    </div>
  );
};

export interface MobileNavItemProps {
  targetPath: string;
  children?: ReactNode;
}

export const MobileNavItem: React.FC<MobileNavItemProps> = ({
  children,
  targetPath,
}) => {
  const router = useRouter();
  const isActive = router ? router.asPath.includes(targetPath) : false;

  return (
    <Link href={targetPath}>
      <a>
        <div className="flex cursor-pointer">
          {children &&
            React.Children.map(children, (child) => {
              return React.cloneElement(child as React.ReactElement, {
                className: isActive ? "text-accent" : "text-primary-100",
              });
            })}
        </div>
      </a>
    </Link>
  );
};

export interface NavItem {
  targetPath: string;
  icon: JSX.Element;
}

export interface MobileNavProps {
  items: NavItem[];
}

export const MobileNav: React.FC<MobileNavProps> = ({ items }) => {
  return (
    <MobileNavContainer>
      {items.map((item) => {
        return (
          <MobileNavItem key={item.targetPath} targetPath={item.targetPath}>
            {item.icon}
          </MobileNavItem>
        );
      })}
    </MobileNavContainer>
  );
};

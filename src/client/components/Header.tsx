import { useSuspenseQuery } from "@tanstack/react-query";
import { isAdminQuery } from "@/client/helpers/api";
import { useModal } from "@/client/hooks/useModal";

export const Header = () => {
  const { data: isAdmin } = useSuspenseQuery(isAdminQuery);

  const { addEvent, showLogin } = useModal();

  const onClick = isAdmin ? () => addEvent() : showLogin;

  const label = isAdmin ? "add +" : "log in";

  return (
    <header className="header">
      <div />
      <button type="button" className="btn" onClick={onClick}>
        {label}
      </button>
    </header>
  );
};

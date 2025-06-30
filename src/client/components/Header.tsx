import { useAuth } from "@client/hooks/useAuth";
import { useModal } from "@client/hooks/useModal";

export const Header = () => {
  const { addEvent, showLogin } = useModal();

  const { isAdmin } = useAuth();

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

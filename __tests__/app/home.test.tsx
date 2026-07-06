import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "@/app/page";

const renderLoadedHome = async () => {
  render(<Home />);

  return screen.findByRole(
    "heading",
    {
      name: /transformo ideias em sites, sistemas e aplicativos/i,
    },
    { timeout: 2500 },
  );
};

describe("Home page", () => {
  it("renders the main navigation, hero CTA and project section", async () => {
    await renderLoadedHome();

    expect(screen.getByRole("navigation", { name: /navegação principal/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /fale comigo/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /solicitar orçamento/i })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: /projetos em destaque/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /abrir projeto paula corrêa/i })).toBeInTheDocument();
  });

  it("opens and closes a project gallery by keyboard-accessible buttons", async () => {
    const user = userEvent.setup();
    await renderLoadedHome();

    await user.click(screen.getByRole("button", { name: /abrir projeto paula corrêa/i }));

    expect(screen.getByRole("dialog", { name: /paula corrêa/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /fechar galeria/i })).toHaveFocus();

    await user.click(screen.getByRole("button", { name: /fechar galeria/i }));
    await waitFor(() => {
      expect(screen.queryByRole("dialog", { name: /paula corrêa/i })).not.toBeInTheDocument();
    });
  });

  it("shows the back-to-top button after scroll and scrolls to the top", async () => {
    const user = userEvent.setup();
    await renderLoadedHome();

    Object.defineProperty(window, "scrollY", {
      configurable: true,
      value: 360,
    });
    fireEvent.scroll(window);

    const button = await screen.findByRole("button", { name: /voltar ao topo/i });
    await user.click(button);

    expect(window.scrollTo).toHaveBeenCalledWith({ behavior: "smooth", top: 0 });
  });
});

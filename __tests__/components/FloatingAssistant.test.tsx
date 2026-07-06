import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FloatingAssistant from "@/components/FloatingAssistant";

describe("FloatingAssistant", () => {
  it("opens and closes the assistant dialog with accessible controls", async () => {
    const user = userEvent.setup();
    render(<FloatingAssistant />);

    const launcher = screen.getByRole("button", { name: /abrir assistente de ia/i });
    await user.click(launcher);

    expect(
      screen.getByRole("dialog", { name: /assistente de ia do site de wesley farias/i }),
    ).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByLabelText(/mensagem para o assistente/i)).toHaveFocus();
    });

    await user.click(screen.getByRole("button", { name: /^fechar assistente$/i }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("sends a local suggestion and renders the assistant reply", async () => {
    const user = userEvent.setup();
    render(<FloatingAssistant />);

    await user.click(screen.getByRole("button", { name: /abrir assistente de ia/i }));
    await user.click(screen.getByRole("button", { name: /quais tecnologias você usa/i }));

    expect(await screen.findByText(/stack principal do wesley/i)).toBeInTheDocument();
    expect(screen.getAllByText(/front-end/i).length).toBeGreaterThan(0);
  });

  it("keeps the submit button disabled for empty messages", async () => {
    const user = userEvent.setup();
    render(<FloatingAssistant />);

    await user.click(screen.getByRole("button", { name: /abrir assistente de ia/i }));

    expect(screen.getByRole("button", { name: /enviar mensagem/i })).toBeDisabled();
  });
});

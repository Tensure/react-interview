import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import App from '../App';

describe('editing a task title', () => {
  it('keeps in-progress edits attached to the correct task when the list above it changes', async () => {
    const user = userEvent.setup();
    render(<App />);

    await screen.findByText('Morning run');

    // Start editing "Review pull requests" (third row in the default, newest-first sort).
    await user.dblClick(screen.getByText('Review pull requests'));
    const editInput = screen.getByDisplayValue('Review pull requests');
    expect(editInput).toBeInTheDocument();

    // Delete a task above it in the list, and wait for the deletion to actually
    // land before asserting anything (it's an async call under the hood).
    const deleteButtons = screen.getAllByRole('button', { name: /delete task/i });
    await user.click(deleteButtons[0]);
    await waitForElementToBeRemoved(() => screen.queryByText('Refill prescription'), {
      timeout: 2000,
    });

    // The row still being edited should still correspond to "Review pull requests",
    // not whichever task happens to have slid into that list position.
    const stillEditing = await screen.findByDisplayValue(
      'Review pull requests',
      {},
      { timeout: 2000 }
    );
    const row = stillEditing.closest('li');
    expect(row).not.toBeNull();
    expect(
      row!.querySelector('input[type="checkbox"]')
    ).toHaveAccessibleName(/Review pull requests/);
  });
});

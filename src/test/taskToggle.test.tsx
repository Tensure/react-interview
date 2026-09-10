import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import App from '../App';

describe('toggling a task', () => {
  it('completes the task the user actually clicked on, regardless of sort order', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Wait for the initial fetch to resolve.
    await screen.findByText('Morning run');

    // Re-sort the list so it no longer matches the underlying fetch order.
    await user.selectOptions(screen.getByLabelText(/sort by/i), 'dueDate');

    // "Morning run" is seeded as already completed and should sort first by due date.
    const morningRunCheckbox = await screen.findByLabelText(
      'Mark "Morning run" as active'
    );
    await user.click(morningRunCheckbox);

    // The task the user clicked should now be active (unchecked)...
    expect(
      await screen.findByLabelText('Mark "Morning run" as complete')
    ).not.toBeChecked();

    // ...and no other task should have been toggled as a side effect.
    expect(
      await screen.findByLabelText('Mark "Write Q3 project proposal" as complete')
    ).not.toBeChecked();
  });
});

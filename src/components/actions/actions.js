export const appointmentAction = async () => {
  await new Promise(resolve => setTimeout(resolve, 5000));
  return {
    actionStatus: 'ACTION_COMPLETED',
    response: {
      actionSuccessMessage: 'Your appointment is booked successfully',
      hasNextQuestion: true,
      question: 'Can you please share your phone number?',
      type: 'text',
    }
  }
}
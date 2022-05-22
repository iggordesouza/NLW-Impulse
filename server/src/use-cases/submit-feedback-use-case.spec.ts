import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

const createFeedbackSpy = jest.fn();
const sendMail = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy  },
  { sendMail: sendMail }
)

describe('Submit feedback', () => {
  it('should be able to subtmit a feedback', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'example commet',
      screenshot: 'data:image/png;base64test.jpg',
    })).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to subtmit a feedback without type', async () => {
    await expect(submitFeedback.execute({
      type: '',
      comment: 'example commet',
      screenshot: 'data:image/png;base64test.jpg',
    })).rejects.toThrow();
  });

  it('should not be able to subtmit a feedback without comment', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64test.jpg',
    })).rejects.toThrow();
  });

  it('should not be able to subtmit a feedback with an invalid screenshot', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'tá tudo bugado',
      screenshot: 'test.jpg',
    })).rejects.toThrow();
  });
}); 
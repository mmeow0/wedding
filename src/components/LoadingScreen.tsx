type LoadingScreenProps = {
  readonly mode?: "loading" | "error";
};

export function LoadingScreen({ mode = "loading" }: LoadingScreenProps) {
  const isError = mode === "error";

  return (
    <div
      className="loading-screen"
      role={isError ? "alert" : "status"}
      aria-live="polite"
      aria-busy={isError ? undefined : "true"}
    >
      <img
        src="/design/cloud.png"
        alt=""
        aria-hidden="true"
        className="loading-screen__cloud loading-screen__cloud--one"
      />
      <img
        src="/design/cloud.png"
        alt=""
        aria-hidden="true"
        className="loading-screen__cloud loading-screen__cloud--two"
      />

      <div className="loading-screen__card surface-card">
        <img
          src="/design/flower-sprig.png"
          alt=""
          aria-hidden="true"
          className="loading-screen__sprig"
        />
        <p className="loading-screen__eyebrow">{isError ? "Не получилось" : "Ещё чуть-чуть"}</p>
        <h1 className="loading-screen__title">
          {isError ? "Данные не пришли" : "Открываем твое приглашение"}
        </h1>
        <p className="loading-screen__text">
          {isError
            ? "Пожалуйста, обнови страницу чуть позже. Если сообщение повторится, напиши нам, и мы всё проверим <3"
            : "Подгружаем детали вечера, чтобы всё встретило тебя красиво."}
        </p>

        {!isError && (
          <div className="loading-screen__dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        )}
      </div>
    </div>
  );
}

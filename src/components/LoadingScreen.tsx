export function LoadingScreen() {
  return (
    <div className="loading-screen" role="status" aria-live="polite" aria-busy="true">
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
        <p className="loading-screen__eyebrow">Ещё чуть-чуть</p>
        <h1 className="loading-screen__title">Открываем ваше приглашение</h1>
        <p className="loading-screen__text">
          Подгружаем имя гостя и детали вечера, чтобы всё встретило вас красиво.
        </p>

        <div className="loading-screen__dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}

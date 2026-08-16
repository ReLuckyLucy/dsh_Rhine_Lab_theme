import css from './RhineLabHud.module.css'

export function RhineLabHud() {
  return (
    <div className={css.root} aria-hidden="true">
      <div className={css.plate}>
        <span className={css.mark}><i>+</i><i>−</i></span>
        <span className={css.company}>RHINE LAB LLC.</span>
        <span className={css.system}>SYNTHESIZE INFORMATION ANALYSIS OS</span>
      </div>
      <div className={css.access}>
        <span>ACCESS PERMISSION // AUTHORIZED</span>
        <span>FILE NO. DSH–RL–001</span>
      </div>
      <div className={css.edge}>COMPONENT CONTROL SECTION · INTERNAL DATABASE</div>
      <div className={css.validation}><i /><i /><i /></div>
    </div>
  )
}

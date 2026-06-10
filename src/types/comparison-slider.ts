export interface ComparisonSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeAlt?: string;
  afterAlt?: string;
  /** Posición inicial del slider (0–100). Default: 50 */
  initialPosition?: number;
  /** Oscila automáticamente entre animateFrom y animateTo. Default: false */
  autoAnimate?: boolean;
  /** Límite izquierdo de la animación automática en %. Default: 20 */
  animateFrom?: number;
  /** Límite derecho de la animación automática en %. Default: 80 */
  animateTo?: number;
  /** Duración en segundos de cada tramo de la animación. Default: 3 */
  animateDuration?: number;
  /** Pausa en ms antes de que arranque (o reanude) la animación automática. Default: 800 */
  animateDelay?: number;
  /** Suavidad del arrastre manual en segundos. 0 = instantáneo. Default: 0.06 */
  dragSpeed?: number;
}
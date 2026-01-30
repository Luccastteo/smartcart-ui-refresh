---
trigger: manual
description: aplication
---

# DESIGN SYSTEM — PAGLY

> Fintech mobile app • Dark theme • Inspirado em Nubank

---

## PALETA DE CORES

### Mapeamento: Valores → Tokens

```
// Texto
text-primary         → #FFFFFF
text-secondary       → #A1A1AA
text-muted           → #71717A
text-on-dark         → #FFFFFF
text-on-brand        → #FFFFFF

// Superfícies
surface-page         → #09090B
surface-section      → #18181B
surface-card         → #27272A
surface-subtle       → #3F3F46
surface-elevated     → #52525B

// Ações
action-primary       → #8B5CF6 (roxo)
action-primary-hover → #7C3AED
action-primary-active→ #6D28D9
action-secondary     → #3F3F46
action-strong        → #8B5CF6
action-strong-hover  → #7C3AED

// Bordas
border-default       → #3F3F46
border-subtle        → #27272A
border-focus         → #8B5CF6

// Status
status-success       → #10B981
status-warning       → #F59E0B
status-error         → #EF4444
```

---

## COMPONENTES

### BOTÕES

**Primary**
```
bg: action-primary | text: text-on-brand | text-base | font-semibold
radius: radius-md | shadow: shadow-button-primary
padding: space-4 (v) space-6 (h)

Hover:    action-primary-hover | shadow-md
Active:   action-primary-active | scale 0.98
Focus:    ring 2px border-focus
Disabled: opacity 0.5
```

**Secondary**
```
bg: surface-card | text: text-primary | font-medium
border: 1px border-default | radius: radius-md
padding: space-4 space-6

Hover:    bg surface-subtle | border-focus
Focus:    ring 2px border-focus
```

**Strong (CTA)**
```
bg: action-strong | text-lg | font-bold
shadow: shadow-lg | radius: radius-md
padding: space-4 space-8

Hover: action-strong-hover | shadow-xl | scale 1.02
```

---

### CARDS

**Base**
```
bg: surface-card | radius: radius-xl
shadow: shadow-card | padding: space-6
border: 1px border-subtle

Hover: shadow-card-hover | translateY(-2px)
```

**Elevated**
```
bg: surface-elevated | radius: radius-2xl
shadow: shadow-lg | padding: space-8
```

**Interactive**
```
Base + cursor: pointer
Hover: bg surface-subtle | shadow-card-hover
Active: bg surface-elevated
```

---

### INPUTS

**Text Input**
```
bg: surface-card | border: 1px border-default
radius: radius-sm | padding: space-3 space-4
text: text-primary | text-base

Focus:    border-focus | ring 2px border-focus
Error:    border status-error | ring 2px status-error
Disabled: bg surface-section | opacity 0.6
```

**Currency Input**
```
Text Input + text-2xl | font-bold | text-primary
padding: space-4 space-6 | align: center/right
```

**PIN Input**
```
size: 48x56px | bg: surface-card
border: 2px border-default | radius: radius-md
text: text-2xl | font-bold | text-center

Focus:  border-focus | shadow-md
Filled: bg action-primary | text-on-brand
```

---

### NAVEGAÇÃO

**Bottom Tab**
```
bg: surface-section | border-top: 1px border-subtle
height: 64px | padding: space-2 (v)
shadow: shadow-lg

Item - icon: 24px | label: text-xs font-medium | gap: space-1
Active:   icon action-primary | text-primary
Inactive: icon text-muted | text-muted
```

**Header**
```
bg: surface-page | height: 56px
padding: space-4 (h) | border-bottom: 1px border-subtle
title: text-xl | font-semibold
```

---

### LISTAS

**Transaction Item**
```
border-bottom: 1px border-subtle
padding: space-4 | min-height: 72px

icon: 40px | radius-full | bg surface-card
title: text-base | font-medium
subtitle: text-sm | text-secondary
value: text-base | font-semibold
date: text-xs | text-muted

Hover: bg surface-section
```

---

### MODAIS

**Modal**
```
bg: surface-card | radius: radius-2xl (top mobile)
padding: space-6 | max-width: 480px | shadow: shadow-lg
backdrop: #000 opacity 0.6

header - title: text-2xl | font-bold
content: gap space-6
footer: gap space-3 | padding-top space-6
```

**Bottom Sheet**
```
bg: surface-card | radius: radius-2xl (top)
padding: space-6 | shadow: shadow-xl

handle: 40x4px | radius-full | border-default
```

**Toast**
```
bg: surface-elevated | radius: radius-lg
padding: space-4 space-6 | shadow: shadow-lg
min-width: 280px

icon: 24px | text: text-sm font-medium

Success: border-left 4px status-success
Warning: border-left 4px status-warning
Error:   border-left 4px status-error
```

---

### BADGES

**Status Badge**
```
bg: surface-subtle | radius: radius-full
padding: space-1 space-3 | text: text-xs | font-semibold
border: 1px border-default

Success: bg status-success/10 | text status-success
Warning: bg status-warning/10 | text status-warning
Error:   bg status-error/10 | text status-error
```

**Counter**
```
bg: action-primary | radius: radius-full
padding: space-1 | min-width: 20px | height: 20px
text: text-xs | font-bold | text-on-brand
```

---

### CARDS ESPECIAIS

**Balance Card**
```
bg: gradient(action-primary → action-primary-active)
radius: radius-2xl | padding: space-8 | shadow: shadow-lg

label: text-sm | font-medium | opacity 0.8
value: text-5xl | font-bold | text-on-brand
subtext: text-sm | opacity 0.7
actions: gap space-3 | margin-top space-6
```

**Credit Card**
```
bg: surface-elevated | radius: radius-2xl
padding: space-6 | aspect: 1.586 | shadow: shadow-card

brand: top-right 32px | chip: top-left 40px
number: text-xl | font-medium | monospace
name: text-sm | font-medium | text-secondary
expiry: text-sm | font-medium | text-muted
```

**Transaction Card**
```
bg: surface-card | radius: radius-xl
padding: space-6 | shadow: shadow-card
border: 1px border-subtle

header - icon: 48px | radius-lg | bg surface-subtle
divider: 1px border-subtle | margin space-4
row - label: text-sm text-secondary | value: text-sm font-medium
footer: margin-top space-4 | gap space-3
```

---

### LOADING

**Skeleton**
```
bg: surface-card | radius: radius-md
animation: pulse 1.5s ease-in-out
```

**Spinner**
```
size: 24px (s) | 32px (m) | 48px (l)
color: action-primary | animation: rotate 0.8s
```

**Progress Bar**
```
container: bg surface-subtle | radius: radius-full | height: 8px
fill: bg action-primary | transition width 0.3s
```

---

### ICONOGRAFIA

```
Tamanhos:
xs: 16px | sm: 20px | md: 24px | lg: 32px | xl: 48px | 2xl: 64px

Cores:
Default: text-primary | Secondary: text-secondary | Muted: text-muted
Brand: action-primary | Success/Warning/Error: status-*
```

---

## LAYOUTS

```
Container: space-4 (mobile) | space-8 (desktop)
Section: space-12 (mobile) | space-16 (desktop)
Breakpoints: mobile <640px | tablet 640-1024px | desktop >1024px
```

---

## ANIMAÇÕES

**Durações**
```
instant: 100ms  (feedback imediato - hover, ripple)
fast:    200ms  (transições rápidas - focus, press)
normal:  300ms  (transições padrão - modal, drawer)
slow:    500ms  (transições complexas - page transition)
```

**Easings**
```
ease-in:     cubic-bezier(0.4, 0, 1, 1)      (aceleração)
ease-out:    cubic-bezier(0, 0, 0.2, 1)      (desaceleração)
ease-in-out: cubic-bezier(0.4, 0, 0.2, 1)    (suave)
bounce:      cubic-bezier(0.68, -0.55, 0.265, 1.55) (elástico)
```

**Padrões**
```
Hover:       transform + shadow | 200ms ease-out
Press:       scale(0.98) | 100ms ease-in
Modal:       opacity 0→1 + translateY(20→0) | 300ms ease-out
Toast:       slideInRight | 300ms ease-out
Page:        fadeIn | 200ms ease-in-out
Loading:     rotate | 800ms linear infinite
```

---

## IMPLEMENTAÇÃO

### React Native

```javascript
export const tokens = {
  colors: {
    text: {
      primary: '#FFFFFF',
      secondary: '#A1A1AA',
      muted: '#71717A',
      onDark: '#FFFFFF',
      onBrand: '#FFFFFF',
    },
    surface: {
      page: '#09090B',
      section: '#18181B',
      card: '#27272A',
      subtle: '#3F3F46',
      elevated: '#52525B',
    },
    action: {
      primary: '#8B5CF6',
      primaryHover: '#7C3AED',
      primaryActive: '#6D28D9',
      secondary: '#3F3F46',
      strong: '#8B5CF6',
      strongHover: '#7C3AED',
    },
    border: {
      default: '#3F3F46',
      subtle: '#27272A',
      focus: '#8B5CF6',
    },
    status: {
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
    },
  },
  spacing: {
    1: 4, 2: 8, 3: 12, 4: 16,
    6: 24, 8: 32, 12: 48, 16: 64, 20: 80,
  },
  typography: {
    size: {
      xs: 12, sm: 14, base: 16, lg: 18,
      xl: 20, '2xl': 24, '3xl': 30, '4xl': 36, '5xl': 48,
    },
    weight: {
      normal: '400', medium: '500',
      semibold: '600', bold: '700',
    },
  },
  radius: {
    sm: 6, md: 8, lg: 12,
    xl: 16, '2xl': 24, full: 9999,
  },
  shadow: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 3,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.15,
      shadowRadius: 15,
      elevation: 5,
    },
  },
};
```

### CSS

```css
:root {
  /* Colors */
  --text-primary: #FFFFFF;
  --text-secondary: #A1A1AA;
  --surface-page: #09090B;
  --surface-card: #27272A;
  --action-primary: #8B5CF6;
  --border-focus: #8B5CF6;
  --status-success: #10B981;
  
  /* Spacing */
  --space-4: 16px;
  --space-6: 24px;
  
  /* Typography */
  --text-base: 16px;
  --text-xl: 20px;
  
  /* Radius */
  --radius-md: 8px;
  --radius-xl: 16px;
}
```

---

## EXEMPLOS DE USO

### 1. Tela Home Dashboard

```
Container:      surface-page | padding space-4
Header:         padding space-6 (v)
  - Avatar:     32px | radius-full
  - Title:      text-2xl | font-bold
  - Subtitle:   text-sm | text-secondary

Balance Card:   margin-bottom space-6
  - Label:      "Saldo disponível"
  - Value:      R$ format | text-5xl
  - Button:     Primary | "Ver extrato"

Quick Actions:  Grid 2col | gap space-3
  - Item:       surface-card | radius-lg | padding space-4
  - Icon:       icon-lg | action-primary
  - Label:      text-sm | font-medium

Transaction List: divide-y border-subtle
Bottom Tab:     Fixed bottom | shadow-lg
```

---

### 2. Modal Transferência PIX

```
Modal:          surface-card | radius-2xl | padding space-6
Header:
  - Icon:       icon-2xl | action-primary
  - Title:      "Transferir via PIX" | text-2xl | font-bold

Form:           gap space-6
  - Label:      text-sm | font-medium | text-secondary
  - Input:      Currency Input (valor)
  - Input:      Text Input (chave PIX)

Summary:        surface-section | radius-lg | padding space-4
  - Row:        flex justify-between | text-sm
  - Total:      text-lg | font-bold

Actions:        gap space-3 | margin-top space-6
  - Secondary:  "Cancelar" | full-width
  - Primary:    "Confirmar" | full-width
```

---

### 3. Lista de Transações

```
Container:      surface-page
Header:         padding space-4
  - Title:      "Transações" | text-2xl | font-bold

Filters:        horizontal scroll | gap space-2
  - Chip:       surface-card | radius-full
  - Active:     bg action-primary | text-on-brand

List:           divide-y border-subtle
  - Item:       Transaction Item (padrão)

Empty State:    padding space-16 | text-center
  - Icon:       icon-2xl | text-muted
  - Title:      text-lg | font-medium
  - Message:    text-sm | text-muted
```

---

## ACESSIBILIDADE

**Requisitos:**
- Contraste texto: mínimo 4.5:1
- Focus ring: 2px border-focus com offset 2px
- Touch targets: mínimo 44x44px
- Espaçamento: mínimo space-2
- Respeitar prefers-reduced-motion
- Labels descritivos em inputs
- ARIA roles apropriados

---

## CHECKLIST

- [ ] Usa apenas tokens (sem valores hardcoded)
- [ ] 5 estados interativos implementados
- [ ] Focus ring visível com offset
- [ ] Touch targets 44x44px mínimo
- [ ] Contraste adequado (4.5:1)
- [ ] Animações com reduced-motion
- [ ] Testado em diferentes telas
- [ ] Screen reader compatível
- [ ] Loading states implementados

---

**Design System PaGly v1.0** • Janeiro 2026
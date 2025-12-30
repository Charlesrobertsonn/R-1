/* Activity-only styles. Layout/nav handled by level.css */

.comic-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin: 10px auto 0;
}

.comic-panel {
  background: rgba(17,24,39,0.06);
  border: 1px solid rgba(17,24,39,0.10);
  border-radius: 14px;
  padding: 10px;
  cursor: pointer;
  user-select: none;
  transition: transform .12s ease, filter .12s ease, background .12s ease;
}

.comic-panel:hover {
  background: rgba(17,24,39,0.09);
  transform: translateY(-1px);
}

.comic-panel:active {
  transform: translateY(0);
  filter: brightness(0.98);
}

.comic-panel img {
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 12px;
  background: rgba(17,24,39,0.12);
  display: block;
}

.comic-panel p {
  margin: 10px 0 0;
  font-weight: 800;
  font-size: 15px;
  color: #111827;
}

.nav-container {
  margin-top: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.page-number {
  font-weight: 800;
  color: rgba(17,24,39,0.70);
}

/* Quiz */
.quiz-section {
  display: none;
  margin-top: 18px;
  padding-top: 14px;
  border-top: 1px solid rgba(17,24,39,0.10);
}

.quiz-section h2 {
  margin: 0 0 8px;
  font-size: 18px;
}

.quiz-question {
  margin: 0 0 10px;
  font-weight: 700;
}

.quiz-options {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.quiz-result {
  margin-top: 12px;
  font-weight: 800;
}

/* Finish */
.finish-wrapper {
  display: none; /* shown on last page by JS */
  margin-top: 18px;
  justify-content: center;
}

/* Buttons (local utilities, like read-rally/spell-bound) */
.c-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 14px;
  border-radius: 12px;
  font-weight: 800;
  font-size: 14px;
  text-decoration: none;
  border: 1px solid rgba(17,24,39,0.10);
  cursor: pointer;
  transition: transform .12s ease, filter .12s ease;
  background: rgba(17,24,39,0.06);
  color: #111827;
}

.c-btn:active {
  transform: translateY(1px);
  filter: brightness(0.98);
}

.c-btn-primary {
  background: #2563eb;
  color: #fff;
  border-color: rgba(255,255,255,0.25);
}

.c-btn-success {
  background: #2e9e53;
  color: #fff;
  border-color: rgba(255,255,255,0.25);
}

.c-btn-secondary {
  background: rgba(17,24,39,0.06);
  color: #111827;
  border-color: rgba(17,24,39,0.10);
}

/* Responsive */
@media (max-width: 820px) {
  .comic-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (max-width: 520px) {
  .comic-grid { grid-template-columns: 1fr; }
  .comic-panel img { height: 160px; }
}

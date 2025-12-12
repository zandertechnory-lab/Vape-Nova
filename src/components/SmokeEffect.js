"use client";

import { useEffect, useRef } from 'react';
import styles from './SmokeEffect.module.css';

export default function SmokeEffect({ opacity = 0.4 }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];

        const resize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = height + Math.random() * 100;
                this.vx = Math.random() * 1 - 0.5;
                this.vy = Math.random() * 1 + 1;
                this.size = Math.random() * 100 + 50;
                this.alpha = Math.random() * 0.5;
                this.life = Math.random() * 100 + 100;
            }

            update() {
                this.x += this.vx;
                this.y -= this.vy;
                this.life--;
                this.alpha -= 0.002;

                // Reset if dead or off screen
                if (this.life <= 0 || this.alpha <= 0 || this.y < -100) {
                    this.reset();
                }
            }

            reset() {
                this.x = Math.random() * width;
                this.y = height + Math.random() * 100;
                this.vx = Math.random() * 1 - 0.5;
                this.vy = Math.random() * 1 + 1;
                this.size = Math.random() * 100 + 50;
                this.alpha = Math.random() * 0.5;
                this.life = Math.random() * 100 + 100;
            }

            draw() {
                ctx.save();
                ctx.globalAlpha = this.alpha * opacity;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

                // Create gradient for soft smoke look
                const gradient = ctx.createRadialGradient(
                    this.x, this.y, 0,
                    this.x, this.y, this.size
                );
                gradient.addColorStop(0, 'rgba(200, 200, 200, 0.2)');
                gradient.addColorStop(1, 'rgba(200, 200, 200, 0)');

                ctx.fillStyle = gradient;
                ctx.fill();
                ctx.restore();
            }
        }

        const init = () => {
            resize();
            for (let i = 0; i < 50; i++) {
                particles.push(new Particle());
            }
            animate();
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animate);
        };

        window.addEventListener('resize', resize);
        init();

        return () => {
            window.removeEventListener('resize', resize);
        };
    }, [opacity]);

    return <canvas ref={canvasRef} className={styles.canvas} />;
}

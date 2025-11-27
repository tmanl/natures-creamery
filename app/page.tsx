export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#FAF5E6",
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        color: "#2E2E2E",
        margin: 0,
      }}
    >
      {/* HERO */}
      <section
        style={{
          padding: "4rem 1.5rem",
          textAlign: "center",
          maxWidth: "960px",
          margin: "0 auto",
        }}
      >
        <p
          style={{
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            fontSize: "0.8rem",
            color: "#7a6a58",
            marginBottom: "0.75rem",
          }}
        >
          Indulgence without compromise
        </p>
        <h1
          style={{
            fontSize: "2.8rem",
            lineHeight: 1.1,
            marginBottom: "1rem",
          }}
        >
          Nature&apos;s Creamery
        </h1>
        <p
          style={{
            fontSize: "1.1rem",
            maxWidth: "620px",
            margin: "0.5rem auto 2rem",
            color: "#4f4a43",
          }}
        >
          Creamy, plant-based spreads crafted from nature&apos;s best ingredients.
          A little moment of luxury that loves your body back.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
          <a
            href="#shop"
            style={{
              padding: "0.9rem 1.8rem",
              borderRadius: "999px",
              backgroundColor: "#5E462B",
              color: "#fff",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "0.95rem",
            }}
          >
            Shop Spreads
          </a>
          <a
            href="#story"
            style={{
              padding: "0.9rem 1.8rem",
              borderRadius: "999px",
              border: "1px solid #5E462B",
              color: "#5E462B",
              textDecoration: "none",
              fontWeight: 500,
              fontSize: "0.95rem",
              backgroundColor: "transparent",
            }}
          >
            Our Story
          </a>
        </div>
      </section>

      {/* LIFESTYLE SECTION */}
      <section
        id="story"
        style={{
          backgroundColor: "#F2E7D5",
          padding: "3.5rem 1.5rem",
        }}
      >
        <div
          style={{
            maxWidth: "1040px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 1fr)",
            gap: "2.5rem",
          }}
        >
          <div>
            <h2
              style={{
                fontSize: "1.9rem",
                marginBottom: "1rem",
              }}
            >
              A holistic way to indulge
            </h2>
            <p style={{ marginBottom: "0.8rem", color: "#4f4a43" }}>
              At Nature&apos;s Creamery, we believe treats should feel good during
              and after the last spoonful. Our recipes are intentionally crafted
              using plant-based ingredients, clean-label formulations, and
              protein-powered blends from Burcon.
            </p>
            <p style={{ marginBottom: "0.8rem", color: "#4f4a43" }}>
              Think slow mornings, shared boards, and late-night snacks — all
              elevated with rich, creamy textures and thoughtful nutrition.
            </p>
            <p style={{ color: "#4f4a43" }}>
              Whether you&apos;re plant-curious or fully plant-based, our spreads
              are made to fit beautifully into a lifestyle that values
              nourishment, pleasure, and care for the planet.
            </p>
          </div>
          <div
            style={{
              backgroundColor: "#FAF5E6",
              borderRadius: "1.25rem",
              padding: "1.8rem",
              boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
              border: "1px solid #E1D2BD",
            }}
          >
            <h3
              style={{
                fontSize: "1.1rem",
                marginBottom: "1rem",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "#7a6a58",
              }}
            >
              Crafted for modern living
            </h3>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "grid",
                gap: "0.75rem",
                fontSize: "0.95rem",
                color: "#4f4a43",
              }}
            >
              <li>• Plant-based and creamy, never compromise on texture.</li>
              <li>• Protein-enhanced with innovative Burcon blends.</li>
              <li>• Versatile for toast, baking, boards, and desserts.</li>
              <li>• Designed for people who read labels and love flavour.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* PRODUCT SECTION */}
      <section
        id="shop"
        style={{
          padding: "3.5rem 1.5rem 3rem",
          backgroundColor: "#FFFBEA",
        }}
      >
        <div style={{ maxWidth: "1040px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <h2
              style={{
                fontSize: "1.9rem",
                marginBottom: "0.75rem",
              }}
            >
              Signature spreads &amp; blends
            </h2>
            <p
              style={{
                maxWidth: "640px",
                margin: "0 auto",
                color: "#4f4a43",
                fontSize: "0.98rem",
              }}
            >
              Thoughtful, small-batch recipes ready for your toast, waffles,
              fruit plates, and dessert boards. Shop our hero creations below.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "1.8rem",
            }}
          >
            {/* Cocovida */}
            <article
              style={{
                backgroundColor: "#FAF5E6",
                borderRadius: "1.25rem",
                padding: "1.6rem",
                border: "1px solid #E1D2BD",
                boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
              }}
            >
              <p
                style={{
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "#7a6a58",
                  marginBottom: "0.4rem",
                }}
              >
                Best seller
              </p>
              <h3 style={{ fontSize: "1.3rem", marginBottom: "0.4rem" }}>
                Cocovida Creamy Chocolate Spread
              </h3>
              <p
                style={{
                  fontSize: "0.96rem",
                  color: "#4f4a43",
                  marginBottom: "0.85rem",
                }}
              >
                Silky, rich, and deeply chocolatey with a plant-based twist.
                Perfect for toast, strawberries, spoonfuls straight from the jar.
              </p>
              <p
                style={{
                  fontWeight: 600,
                  marginBottom: "0.85rem",
                  color: "#5E462B",
                }}
              >
                $12.99
              </p>
              <button
                style={{
                  padding: "0.7rem 1.2rem",
                  borderRadius: "999px",
                  border: "none",
                  backgroundColor: "#5E462B",
                  color: "#fff",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                Add to cart
              </button>
            </article>

            {/* Mayo */}
            <article
              style={{
                backgroundColor: "#FAF5E6",
                borderRadius: "1.25rem",
                padding: "1.6rem",
                border: "1px solid #E1D2BD",
                boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
              }}
            >
              <p
                style={{
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "#7a6a58",
                  marginBottom: "0.4rem",
                }}
              >
                Everyday staple
              </p>
              <h3 style={{ fontSize: "1.3rem", marginBottom: "0.4rem" }}>
                Nature&apos;s Creamery Mayonnaise
              </h3>
              <p
                style={{
                  fontSize: "0.96rem",
                  color: "#4f4a43",
                  marginBottom: "0.85rem",
                }}
              >
                A lush, egg-free mayo with a clean label. Beautiful in bowls,
                sandwiches, and your favourite weeknight recipes.
              </p>
              <p
                style={{
                  fontWeight: 600,
                  marginBottom: "0.85rem",
                  color: "#5E462B",
                }}
              >
                $9.99
              </p>
              <button
                style={{
                  padding: "0.7rem 1.2rem",
                  borderRadius: "999px",
                  border: "1px solid #5E462B",
                  backgroundColor: "transparent",
                  color: "#5E462B",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                View details
              </button>
            </article>

            {/* Protein blends */}
            <article
              style={{
                backgroundColor: "#FAF5E6",
                borderRadius: "1.25rem",
                padding: "1.6rem",
                border: "1px solid #E1D2BD",
                boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
              }}
            >
              <p
                style={{
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "#7a6a58",
                  marginBottom: "0.4rem",
                }}
              >
                Behind the scenes
              </p>
              <h3 style={{ fontSize: "1.3rem", marginBottom: "0.4rem" }}>
                Burcon Protein Blends
              </h3>
              <p
                style={{
                  fontSize: "0.96rem",
                  color: "#4f4a43",
                  marginBottom: "0.85rem",
                }}
              >
                Innovative plant proteins that give our spreads their satisfying
                body and creaminess, without compromise.
              </p>
              <p
                style={{
                  fontWeight: 600,
                  marginBottom: "0.85rem",
                  color: "#5E462B",
                }}
              >
                For food innovators &amp; partners
              </p>
              <button
                style={{
                  padding: "0.7rem 1.2rem",
                  borderRadius: "999px",
                  border: "none",
                  backgroundColor: "#5E462B",
                  color: "#fff",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                Collaborate with us
              </button>
            </article>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section
        style={{
          padding: "3rem 1.5rem 3.5rem",
          backgroundColor: "#FAF5E6",
          borderTop: "1px solid #E1D2BD",
        }}
      >
        <div
          style={{
            maxWidth: "640px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: "1.6rem",
              marginBottom: "0.75rem",
            }}
          >
            Stay stirred into our world
          </h2>
          <p
            style={{
              fontSize: "0.98rem",
              color: "#4f4a43",
              marginBottom: "1.4rem",
            }}
          >
            Be the first to hear about new flavours, recipe ideas, and limited
            drops from Nature&apos;s Creamery.
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "0.75rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <input
              type="email"
              placeholder="Enter your email"
              style={{
                padding: "0.8rem 1rem",
                borderRadius: "999px",
                border: "1px solid #C6B7A2",
                minWidth: "220px",
                fontSize: "0.95rem",
              }}
            />
            <button
              style={{
                padding: "0.8rem 1.6rem",
                borderRadius: "999px",
                border: "none",
                backgroundColor: "#5E462B",
                color: "#fff",
                fontSize: "0.9rem",
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              Join the list
            </button>
          </div>
          <p
            style={{
              marginTop: "0.8rem",
              fontSize: "0.8rem",
              color: "#8b7a66",
            }}
          >
            We respect your inbox. Only slow-living, spread-loving updates.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          padding: "1.2rem 1.5rem",
          backgroundColor: "#5E462B",
          color: "#F5EDE1",
          textAlign: "center",
          fontSize: "0.8rem",
        }}
      >
        © {new Date().getFullYear()} Nature&apos;s Creamery · Indulgence without
        compromise.
      </footer>
    </main>
  );
}

from backend_core import ask_gita


def main() -> None:
    while True:
        query = input("\nAsk about Bhagavad Gita (type 'exit' to quit): ")
        if query.lower() == "exit":
            break

        result = ask_gita(query)
        print("\nAnswer:\n", result["answer"])


if __name__ == "__main__":
    main()

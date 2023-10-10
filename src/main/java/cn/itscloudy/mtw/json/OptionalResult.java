package cn.itscloudy.mtw.json;

import java.util.Objects;
import java.util.Optional;
import java.util.concurrent.Callable;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.function.Supplier;

public class OptionalResult<T> {
    private Throwable e;
    private T value;

    private OptionalResult() {

    }

    public static <T> OptionalResult<T> of(Callable<? extends T> supplier) {
        try {
            T value = supplier.call();
            return ofValue(value);
        } catch (Throwable e) {
            return ofThrowable(e);
        }
    }

    public static <T> OptionalResult<T> ofThrowable(Throwable e) {
        OptionalResult<T> holder = new OptionalResult<>();
        holder.e = e;
        return holder;
    }

    public static <T> OptionalResult<T> ofValue(T value) {
        OptionalResult<T> holder = new OptionalResult<>();
        holder.value = value;
        return holder;
    }

    public <X extends Throwable> T orElseThrow(Function<Throwable, X> exceptionExchanger) throws X {
        if (e != null) {
            throw exceptionExchanger.apply(e);
        }
        return value;
    }

    public T orElse(T other) {
        if (e != null) {
            return other;
        }
        return value;
    }

    public T orElseGet(Supplier<? extends T> other) {
        if (e != null) {
            return other.get();
        }
        return value;
    }

    public void ifPresent(Consumer<? super T> consumer) {
        if (value != null) {
            consumer.accept(value);
        }
    }

    public boolean isPresent() {
        return value != null;
    }

    public T get() {
        return value;
    }

    public Throwable getE() {
        return e;
    }

    public Optional<T> optional() {
        return Optional.ofNullable(value);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }

        if (!(obj instanceof OptionalResult)) {
            return false;
        }

        OptionalResult<?> other = (OptionalResult<?>) obj;
        return Objects.equals(value, other.value);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(value);
    }

    @Override
    public String toString() {
        return value != null
                ? String.format("OptionalResult[%s]", value)
                : String.format("OptionalResult(%s)", e.getClass().getSimpleName());
    }
}


/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Speaker
 * 
 */
export type Speaker = $Result.DefaultSelection<Prisma.$SpeakerPayload>
/**
 * Model ChapelSession
 * 
 */
export type ChapelSession = $Result.DefaultSelection<Prisma.$ChapelSessionPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Feedback
 * 
 */
export type Feedback = $Result.DefaultSelection<Prisma.$FeedbackPayload>
/**
 * Model Task
 * 
 */
export type Task = $Result.DefaultSelection<Prisma.$TaskPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserType: {
  ADMIN: 'ADMIN',
  STUDENT: 'STUDENT',
  STAFF: 'STAFF'
};

export type UserType = (typeof UserType)[keyof typeof UserType]

}

export type UserType = $Enums.UserType

export const UserType: typeof $Enums.UserType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Speakers
 * const speakers = await prisma.speaker.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Speakers
   * const speakers = await prisma.speaker.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.speaker`: Exposes CRUD operations for the **Speaker** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Speakers
    * const speakers = await prisma.speaker.findMany()
    * ```
    */
  get speaker(): Prisma.SpeakerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.chapelSession`: Exposes CRUD operations for the **ChapelSession** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ChapelSessions
    * const chapelSessions = await prisma.chapelSession.findMany()
    * ```
    */
  get chapelSession(): Prisma.ChapelSessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.feedback`: Exposes CRUD operations for the **Feedback** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Feedbacks
    * const feedbacks = await prisma.feedback.findMany()
    * ```
    */
  get feedback(): Prisma.FeedbackDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.task`: Exposes CRUD operations for the **Task** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tasks
    * const tasks = await prisma.task.findMany()
    * ```
    */
  get task(): Prisma.TaskDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.3.0
   * Query Engine version: 9d6ad21cbbceab97458517b147a6a09ff43aa735
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Speaker: 'Speaker',
    ChapelSession: 'ChapelSession',
    User: 'User',
    Feedback: 'Feedback',
    Task: 'Task'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "speaker" | "chapelSession" | "user" | "feedback" | "task"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Speaker: {
        payload: Prisma.$SpeakerPayload<ExtArgs>
        fields: Prisma.SpeakerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SpeakerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpeakerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SpeakerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpeakerPayload>
          }
          findFirst: {
            args: Prisma.SpeakerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpeakerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SpeakerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpeakerPayload>
          }
          findMany: {
            args: Prisma.SpeakerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpeakerPayload>[]
          }
          create: {
            args: Prisma.SpeakerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpeakerPayload>
          }
          createMany: {
            args: Prisma.SpeakerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SpeakerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpeakerPayload>[]
          }
          delete: {
            args: Prisma.SpeakerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpeakerPayload>
          }
          update: {
            args: Prisma.SpeakerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpeakerPayload>
          }
          deleteMany: {
            args: Prisma.SpeakerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SpeakerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SpeakerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpeakerPayload>[]
          }
          upsert: {
            args: Prisma.SpeakerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpeakerPayload>
          }
          aggregate: {
            args: Prisma.SpeakerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSpeaker>
          }
          groupBy: {
            args: Prisma.SpeakerGroupByArgs<ExtArgs>
            result: $Utils.Optional<SpeakerGroupByOutputType>[]
          }
          count: {
            args: Prisma.SpeakerCountArgs<ExtArgs>
            result: $Utils.Optional<SpeakerCountAggregateOutputType> | number
          }
        }
      }
      ChapelSession: {
        payload: Prisma.$ChapelSessionPayload<ExtArgs>
        fields: Prisma.ChapelSessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ChapelSessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChapelSessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ChapelSessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChapelSessionPayload>
          }
          findFirst: {
            args: Prisma.ChapelSessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChapelSessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ChapelSessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChapelSessionPayload>
          }
          findMany: {
            args: Prisma.ChapelSessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChapelSessionPayload>[]
          }
          create: {
            args: Prisma.ChapelSessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChapelSessionPayload>
          }
          createMany: {
            args: Prisma.ChapelSessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ChapelSessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChapelSessionPayload>[]
          }
          delete: {
            args: Prisma.ChapelSessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChapelSessionPayload>
          }
          update: {
            args: Prisma.ChapelSessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChapelSessionPayload>
          }
          deleteMany: {
            args: Prisma.ChapelSessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ChapelSessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ChapelSessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChapelSessionPayload>[]
          }
          upsert: {
            args: Prisma.ChapelSessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChapelSessionPayload>
          }
          aggregate: {
            args: Prisma.ChapelSessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateChapelSession>
          }
          groupBy: {
            args: Prisma.ChapelSessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<ChapelSessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.ChapelSessionCountArgs<ExtArgs>
            result: $Utils.Optional<ChapelSessionCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Feedback: {
        payload: Prisma.$FeedbackPayload<ExtArgs>
        fields: Prisma.FeedbackFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FeedbackFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FeedbackFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>
          }
          findFirst: {
            args: Prisma.FeedbackFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FeedbackFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>
          }
          findMany: {
            args: Prisma.FeedbackFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>[]
          }
          create: {
            args: Prisma.FeedbackCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>
          }
          createMany: {
            args: Prisma.FeedbackCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FeedbackCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>[]
          }
          delete: {
            args: Prisma.FeedbackDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>
          }
          update: {
            args: Prisma.FeedbackUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>
          }
          deleteMany: {
            args: Prisma.FeedbackDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FeedbackUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FeedbackUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>[]
          }
          upsert: {
            args: Prisma.FeedbackUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>
          }
          aggregate: {
            args: Prisma.FeedbackAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFeedback>
          }
          groupBy: {
            args: Prisma.FeedbackGroupByArgs<ExtArgs>
            result: $Utils.Optional<FeedbackGroupByOutputType>[]
          }
          count: {
            args: Prisma.FeedbackCountArgs<ExtArgs>
            result: $Utils.Optional<FeedbackCountAggregateOutputType> | number
          }
        }
      }
      Task: {
        payload: Prisma.$TaskPayload<ExtArgs>
        fields: Prisma.TaskFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TaskFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TaskFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          findFirst: {
            args: Prisma.TaskFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TaskFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          findMany: {
            args: Prisma.TaskFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          create: {
            args: Prisma.TaskCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          createMany: {
            args: Prisma.TaskCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TaskCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          delete: {
            args: Prisma.TaskDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          update: {
            args: Prisma.TaskUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          deleteMany: {
            args: Prisma.TaskDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TaskUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TaskUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          upsert: {
            args: Prisma.TaskUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          aggregate: {
            args: Prisma.TaskAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTask>
          }
          groupBy: {
            args: Prisma.TaskGroupByArgs<ExtArgs>
            result: $Utils.Optional<TaskGroupByOutputType>[]
          }
          count: {
            args: Prisma.TaskCountArgs<ExtArgs>
            result: $Utils.Optional<TaskCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    speaker?: SpeakerOmit
    chapelSession?: ChapelSessionOmit
    user?: UserOmit
    feedback?: FeedbackOmit
    task?: TaskOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type SpeakerCountOutputType
   */

  export type SpeakerCountOutputType = {
    chapelSessions: number
  }

  export type SpeakerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chapelSessions?: boolean | SpeakerCountOutputTypeCountChapelSessionsArgs
  }

  // Custom InputTypes
  /**
   * SpeakerCountOutputType without action
   */
  export type SpeakerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpeakerCountOutputType
     */
    select?: SpeakerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SpeakerCountOutputType without action
   */
  export type SpeakerCountOutputTypeCountChapelSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChapelSessionWhereInput
  }


  /**
   * Count Type ChapelSessionCountOutputType
   */

  export type ChapelSessionCountOutputType = {
    feedbacks: number
  }

  export type ChapelSessionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    feedbacks?: boolean | ChapelSessionCountOutputTypeCountFeedbacksArgs
  }

  // Custom InputTypes
  /**
   * ChapelSessionCountOutputType without action
   */
  export type ChapelSessionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChapelSessionCountOutputType
     */
    select?: ChapelSessionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ChapelSessionCountOutputType without action
   */
  export type ChapelSessionCountOutputTypeCountFeedbacksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FeedbackWhereInput
  }


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    feedbacks: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    feedbacks?: boolean | UserCountOutputTypeCountFeedbacksArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFeedbacksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FeedbackWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Speaker
   */

  export type AggregateSpeaker = {
    _count: SpeakerCountAggregateOutputType | null
    _avg: SpeakerAvgAggregateOutputType | null
    _sum: SpeakerSumAggregateOutputType | null
    _min: SpeakerMinAggregateOutputType | null
    _max: SpeakerMaxAggregateOutputType | null
  }

  export type SpeakerAvgAggregateOutputType = {
    id: number | null
  }

  export type SpeakerSumAggregateOutputType = {
    id: number | null
  }

  export type SpeakerMinAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type SpeakerMaxAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type SpeakerCountAggregateOutputType = {
    id: number
    name: number
    _all: number
  }


  export type SpeakerAvgAggregateInputType = {
    id?: true
  }

  export type SpeakerSumAggregateInputType = {
    id?: true
  }

  export type SpeakerMinAggregateInputType = {
    id?: true
    name?: true
  }

  export type SpeakerMaxAggregateInputType = {
    id?: true
    name?: true
  }

  export type SpeakerCountAggregateInputType = {
    id?: true
    name?: true
    _all?: true
  }

  export type SpeakerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Speaker to aggregate.
     */
    where?: SpeakerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Speakers to fetch.
     */
    orderBy?: SpeakerOrderByWithRelationInput | SpeakerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SpeakerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Speakers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Speakers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Speakers
    **/
    _count?: true | SpeakerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SpeakerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SpeakerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SpeakerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SpeakerMaxAggregateInputType
  }

  export type GetSpeakerAggregateType<T extends SpeakerAggregateArgs> = {
        [P in keyof T & keyof AggregateSpeaker]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSpeaker[P]>
      : GetScalarType<T[P], AggregateSpeaker[P]>
  }




  export type SpeakerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SpeakerWhereInput
    orderBy?: SpeakerOrderByWithAggregationInput | SpeakerOrderByWithAggregationInput[]
    by: SpeakerScalarFieldEnum[] | SpeakerScalarFieldEnum
    having?: SpeakerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SpeakerCountAggregateInputType | true
    _avg?: SpeakerAvgAggregateInputType
    _sum?: SpeakerSumAggregateInputType
    _min?: SpeakerMinAggregateInputType
    _max?: SpeakerMaxAggregateInputType
  }

  export type SpeakerGroupByOutputType = {
    id: number
    name: string
    _count: SpeakerCountAggregateOutputType | null
    _avg: SpeakerAvgAggregateOutputType | null
    _sum: SpeakerSumAggregateOutputType | null
    _min: SpeakerMinAggregateOutputType | null
    _max: SpeakerMaxAggregateOutputType | null
  }

  type GetSpeakerGroupByPayload<T extends SpeakerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SpeakerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SpeakerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SpeakerGroupByOutputType[P]>
            : GetScalarType<T[P], SpeakerGroupByOutputType[P]>
        }
      >
    >


  export type SpeakerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    chapelSessions?: boolean | Speaker$chapelSessionsArgs<ExtArgs>
    _count?: boolean | SpeakerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["speaker"]>

  export type SpeakerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["speaker"]>

  export type SpeakerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["speaker"]>

  export type SpeakerSelectScalar = {
    id?: boolean
    name?: boolean
  }

  export type SpeakerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name", ExtArgs["result"]["speaker"]>
  export type SpeakerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chapelSessions?: boolean | Speaker$chapelSessionsArgs<ExtArgs>
    _count?: boolean | SpeakerCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SpeakerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type SpeakerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $SpeakerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Speaker"
    objects: {
      chapelSessions: Prisma.$ChapelSessionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
    }, ExtArgs["result"]["speaker"]>
    composites: {}
  }

  type SpeakerGetPayload<S extends boolean | null | undefined | SpeakerDefaultArgs> = $Result.GetResult<Prisma.$SpeakerPayload, S>

  type SpeakerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SpeakerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SpeakerCountAggregateInputType | true
    }

  export interface SpeakerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Speaker'], meta: { name: 'Speaker' } }
    /**
     * Find zero or one Speaker that matches the filter.
     * @param {SpeakerFindUniqueArgs} args - Arguments to find a Speaker
     * @example
     * // Get one Speaker
     * const speaker = await prisma.speaker.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SpeakerFindUniqueArgs>(args: SelectSubset<T, SpeakerFindUniqueArgs<ExtArgs>>): Prisma__SpeakerClient<$Result.GetResult<Prisma.$SpeakerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Speaker that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SpeakerFindUniqueOrThrowArgs} args - Arguments to find a Speaker
     * @example
     * // Get one Speaker
     * const speaker = await prisma.speaker.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SpeakerFindUniqueOrThrowArgs>(args: SelectSubset<T, SpeakerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SpeakerClient<$Result.GetResult<Prisma.$SpeakerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Speaker that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpeakerFindFirstArgs} args - Arguments to find a Speaker
     * @example
     * // Get one Speaker
     * const speaker = await prisma.speaker.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SpeakerFindFirstArgs>(args?: SelectSubset<T, SpeakerFindFirstArgs<ExtArgs>>): Prisma__SpeakerClient<$Result.GetResult<Prisma.$SpeakerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Speaker that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpeakerFindFirstOrThrowArgs} args - Arguments to find a Speaker
     * @example
     * // Get one Speaker
     * const speaker = await prisma.speaker.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SpeakerFindFirstOrThrowArgs>(args?: SelectSubset<T, SpeakerFindFirstOrThrowArgs<ExtArgs>>): Prisma__SpeakerClient<$Result.GetResult<Prisma.$SpeakerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Speakers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpeakerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Speakers
     * const speakers = await prisma.speaker.findMany()
     * 
     * // Get first 10 Speakers
     * const speakers = await prisma.speaker.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const speakerWithIdOnly = await prisma.speaker.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SpeakerFindManyArgs>(args?: SelectSubset<T, SpeakerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SpeakerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Speaker.
     * @param {SpeakerCreateArgs} args - Arguments to create a Speaker.
     * @example
     * // Create one Speaker
     * const Speaker = await prisma.speaker.create({
     *   data: {
     *     // ... data to create a Speaker
     *   }
     * })
     * 
     */
    create<T extends SpeakerCreateArgs>(args: SelectSubset<T, SpeakerCreateArgs<ExtArgs>>): Prisma__SpeakerClient<$Result.GetResult<Prisma.$SpeakerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Speakers.
     * @param {SpeakerCreateManyArgs} args - Arguments to create many Speakers.
     * @example
     * // Create many Speakers
     * const speaker = await prisma.speaker.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SpeakerCreateManyArgs>(args?: SelectSubset<T, SpeakerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Speakers and returns the data saved in the database.
     * @param {SpeakerCreateManyAndReturnArgs} args - Arguments to create many Speakers.
     * @example
     * // Create many Speakers
     * const speaker = await prisma.speaker.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Speakers and only return the `id`
     * const speakerWithIdOnly = await prisma.speaker.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SpeakerCreateManyAndReturnArgs>(args?: SelectSubset<T, SpeakerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SpeakerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Speaker.
     * @param {SpeakerDeleteArgs} args - Arguments to delete one Speaker.
     * @example
     * // Delete one Speaker
     * const Speaker = await prisma.speaker.delete({
     *   where: {
     *     // ... filter to delete one Speaker
     *   }
     * })
     * 
     */
    delete<T extends SpeakerDeleteArgs>(args: SelectSubset<T, SpeakerDeleteArgs<ExtArgs>>): Prisma__SpeakerClient<$Result.GetResult<Prisma.$SpeakerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Speaker.
     * @param {SpeakerUpdateArgs} args - Arguments to update one Speaker.
     * @example
     * // Update one Speaker
     * const speaker = await prisma.speaker.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SpeakerUpdateArgs>(args: SelectSubset<T, SpeakerUpdateArgs<ExtArgs>>): Prisma__SpeakerClient<$Result.GetResult<Prisma.$SpeakerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Speakers.
     * @param {SpeakerDeleteManyArgs} args - Arguments to filter Speakers to delete.
     * @example
     * // Delete a few Speakers
     * const { count } = await prisma.speaker.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SpeakerDeleteManyArgs>(args?: SelectSubset<T, SpeakerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Speakers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpeakerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Speakers
     * const speaker = await prisma.speaker.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SpeakerUpdateManyArgs>(args: SelectSubset<T, SpeakerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Speakers and returns the data updated in the database.
     * @param {SpeakerUpdateManyAndReturnArgs} args - Arguments to update many Speakers.
     * @example
     * // Update many Speakers
     * const speaker = await prisma.speaker.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Speakers and only return the `id`
     * const speakerWithIdOnly = await prisma.speaker.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SpeakerUpdateManyAndReturnArgs>(args: SelectSubset<T, SpeakerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SpeakerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Speaker.
     * @param {SpeakerUpsertArgs} args - Arguments to update or create a Speaker.
     * @example
     * // Update or create a Speaker
     * const speaker = await prisma.speaker.upsert({
     *   create: {
     *     // ... data to create a Speaker
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Speaker we want to update
     *   }
     * })
     */
    upsert<T extends SpeakerUpsertArgs>(args: SelectSubset<T, SpeakerUpsertArgs<ExtArgs>>): Prisma__SpeakerClient<$Result.GetResult<Prisma.$SpeakerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Speakers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpeakerCountArgs} args - Arguments to filter Speakers to count.
     * @example
     * // Count the number of Speakers
     * const count = await prisma.speaker.count({
     *   where: {
     *     // ... the filter for the Speakers we want to count
     *   }
     * })
    **/
    count<T extends SpeakerCountArgs>(
      args?: Subset<T, SpeakerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SpeakerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Speaker.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpeakerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SpeakerAggregateArgs>(args: Subset<T, SpeakerAggregateArgs>): Prisma.PrismaPromise<GetSpeakerAggregateType<T>>

    /**
     * Group by Speaker.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpeakerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SpeakerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SpeakerGroupByArgs['orderBy'] }
        : { orderBy?: SpeakerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SpeakerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSpeakerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Speaker model
   */
  readonly fields: SpeakerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Speaker.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SpeakerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    chapelSessions<T extends Speaker$chapelSessionsArgs<ExtArgs> = {}>(args?: Subset<T, Speaker$chapelSessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChapelSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Speaker model
   */
  interface SpeakerFieldRefs {
    readonly id: FieldRef<"Speaker", 'Int'>
    readonly name: FieldRef<"Speaker", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Speaker findUnique
   */
  export type SpeakerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Speaker
     */
    select?: SpeakerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Speaker
     */
    omit?: SpeakerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpeakerInclude<ExtArgs> | null
    /**
     * Filter, which Speaker to fetch.
     */
    where: SpeakerWhereUniqueInput
  }

  /**
   * Speaker findUniqueOrThrow
   */
  export type SpeakerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Speaker
     */
    select?: SpeakerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Speaker
     */
    omit?: SpeakerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpeakerInclude<ExtArgs> | null
    /**
     * Filter, which Speaker to fetch.
     */
    where: SpeakerWhereUniqueInput
  }

  /**
   * Speaker findFirst
   */
  export type SpeakerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Speaker
     */
    select?: SpeakerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Speaker
     */
    omit?: SpeakerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpeakerInclude<ExtArgs> | null
    /**
     * Filter, which Speaker to fetch.
     */
    where?: SpeakerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Speakers to fetch.
     */
    orderBy?: SpeakerOrderByWithRelationInput | SpeakerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Speakers.
     */
    cursor?: SpeakerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Speakers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Speakers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Speakers.
     */
    distinct?: SpeakerScalarFieldEnum | SpeakerScalarFieldEnum[]
  }

  /**
   * Speaker findFirstOrThrow
   */
  export type SpeakerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Speaker
     */
    select?: SpeakerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Speaker
     */
    omit?: SpeakerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpeakerInclude<ExtArgs> | null
    /**
     * Filter, which Speaker to fetch.
     */
    where?: SpeakerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Speakers to fetch.
     */
    orderBy?: SpeakerOrderByWithRelationInput | SpeakerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Speakers.
     */
    cursor?: SpeakerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Speakers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Speakers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Speakers.
     */
    distinct?: SpeakerScalarFieldEnum | SpeakerScalarFieldEnum[]
  }

  /**
   * Speaker findMany
   */
  export type SpeakerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Speaker
     */
    select?: SpeakerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Speaker
     */
    omit?: SpeakerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpeakerInclude<ExtArgs> | null
    /**
     * Filter, which Speakers to fetch.
     */
    where?: SpeakerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Speakers to fetch.
     */
    orderBy?: SpeakerOrderByWithRelationInput | SpeakerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Speakers.
     */
    cursor?: SpeakerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Speakers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Speakers.
     */
    skip?: number
    distinct?: SpeakerScalarFieldEnum | SpeakerScalarFieldEnum[]
  }

  /**
   * Speaker create
   */
  export type SpeakerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Speaker
     */
    select?: SpeakerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Speaker
     */
    omit?: SpeakerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpeakerInclude<ExtArgs> | null
    /**
     * The data needed to create a Speaker.
     */
    data: XOR<SpeakerCreateInput, SpeakerUncheckedCreateInput>
  }

  /**
   * Speaker createMany
   */
  export type SpeakerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Speakers.
     */
    data: SpeakerCreateManyInput | SpeakerCreateManyInput[]
  }

  /**
   * Speaker createManyAndReturn
   */
  export type SpeakerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Speaker
     */
    select?: SpeakerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Speaker
     */
    omit?: SpeakerOmit<ExtArgs> | null
    /**
     * The data used to create many Speakers.
     */
    data: SpeakerCreateManyInput | SpeakerCreateManyInput[]
  }

  /**
   * Speaker update
   */
  export type SpeakerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Speaker
     */
    select?: SpeakerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Speaker
     */
    omit?: SpeakerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpeakerInclude<ExtArgs> | null
    /**
     * The data needed to update a Speaker.
     */
    data: XOR<SpeakerUpdateInput, SpeakerUncheckedUpdateInput>
    /**
     * Choose, which Speaker to update.
     */
    where: SpeakerWhereUniqueInput
  }

  /**
   * Speaker updateMany
   */
  export type SpeakerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Speakers.
     */
    data: XOR<SpeakerUpdateManyMutationInput, SpeakerUncheckedUpdateManyInput>
    /**
     * Filter which Speakers to update
     */
    where?: SpeakerWhereInput
    /**
     * Limit how many Speakers to update.
     */
    limit?: number
  }

  /**
   * Speaker updateManyAndReturn
   */
  export type SpeakerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Speaker
     */
    select?: SpeakerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Speaker
     */
    omit?: SpeakerOmit<ExtArgs> | null
    /**
     * The data used to update Speakers.
     */
    data: XOR<SpeakerUpdateManyMutationInput, SpeakerUncheckedUpdateManyInput>
    /**
     * Filter which Speakers to update
     */
    where?: SpeakerWhereInput
    /**
     * Limit how many Speakers to update.
     */
    limit?: number
  }

  /**
   * Speaker upsert
   */
  export type SpeakerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Speaker
     */
    select?: SpeakerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Speaker
     */
    omit?: SpeakerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpeakerInclude<ExtArgs> | null
    /**
     * The filter to search for the Speaker to update in case it exists.
     */
    where: SpeakerWhereUniqueInput
    /**
     * In case the Speaker found by the `where` argument doesn't exist, create a new Speaker with this data.
     */
    create: XOR<SpeakerCreateInput, SpeakerUncheckedCreateInput>
    /**
     * In case the Speaker was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SpeakerUpdateInput, SpeakerUncheckedUpdateInput>
  }

  /**
   * Speaker delete
   */
  export type SpeakerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Speaker
     */
    select?: SpeakerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Speaker
     */
    omit?: SpeakerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpeakerInclude<ExtArgs> | null
    /**
     * Filter which Speaker to delete.
     */
    where: SpeakerWhereUniqueInput
  }

  /**
   * Speaker deleteMany
   */
  export type SpeakerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Speakers to delete
     */
    where?: SpeakerWhereInput
    /**
     * Limit how many Speakers to delete.
     */
    limit?: number
  }

  /**
   * Speaker.chapelSessions
   */
  export type Speaker$chapelSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChapelSession
     */
    select?: ChapelSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChapelSession
     */
    omit?: ChapelSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChapelSessionInclude<ExtArgs> | null
    where?: ChapelSessionWhereInput
    orderBy?: ChapelSessionOrderByWithRelationInput | ChapelSessionOrderByWithRelationInput[]
    cursor?: ChapelSessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ChapelSessionScalarFieldEnum | ChapelSessionScalarFieldEnum[]
  }

  /**
   * Speaker without action
   */
  export type SpeakerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Speaker
     */
    select?: SpeakerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Speaker
     */
    omit?: SpeakerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpeakerInclude<ExtArgs> | null
  }


  /**
   * Model ChapelSession
   */

  export type AggregateChapelSession = {
    _count: ChapelSessionCountAggregateOutputType | null
    _avg: ChapelSessionAvgAggregateOutputType | null
    _sum: ChapelSessionSumAggregateOutputType | null
    _min: ChapelSessionMinAggregateOutputType | null
    _max: ChapelSessionMaxAggregateOutputType | null
  }

  export type ChapelSessionAvgAggregateOutputType = {
    id: number | null
    speakerId: number | null
  }

  export type ChapelSessionSumAggregateOutputType = {
    id: number | null
    speakerId: number | null
  }

  export type ChapelSessionMinAggregateOutputType = {
    id: number | null
    title: string | null
    date: Date | null
    speakerId: number | null
  }

  export type ChapelSessionMaxAggregateOutputType = {
    id: number | null
    title: string | null
    date: Date | null
    speakerId: number | null
  }

  export type ChapelSessionCountAggregateOutputType = {
    id: number
    title: number
    date: number
    speakerId: number
    _all: number
  }


  export type ChapelSessionAvgAggregateInputType = {
    id?: true
    speakerId?: true
  }

  export type ChapelSessionSumAggregateInputType = {
    id?: true
    speakerId?: true
  }

  export type ChapelSessionMinAggregateInputType = {
    id?: true
    title?: true
    date?: true
    speakerId?: true
  }

  export type ChapelSessionMaxAggregateInputType = {
    id?: true
    title?: true
    date?: true
    speakerId?: true
  }

  export type ChapelSessionCountAggregateInputType = {
    id?: true
    title?: true
    date?: true
    speakerId?: true
    _all?: true
  }

  export type ChapelSessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChapelSession to aggregate.
     */
    where?: ChapelSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChapelSessions to fetch.
     */
    orderBy?: ChapelSessionOrderByWithRelationInput | ChapelSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ChapelSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChapelSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChapelSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ChapelSessions
    **/
    _count?: true | ChapelSessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ChapelSessionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ChapelSessionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChapelSessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChapelSessionMaxAggregateInputType
  }

  export type GetChapelSessionAggregateType<T extends ChapelSessionAggregateArgs> = {
        [P in keyof T & keyof AggregateChapelSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChapelSession[P]>
      : GetScalarType<T[P], AggregateChapelSession[P]>
  }




  export type ChapelSessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChapelSessionWhereInput
    orderBy?: ChapelSessionOrderByWithAggregationInput | ChapelSessionOrderByWithAggregationInput[]
    by: ChapelSessionScalarFieldEnum[] | ChapelSessionScalarFieldEnum
    having?: ChapelSessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChapelSessionCountAggregateInputType | true
    _avg?: ChapelSessionAvgAggregateInputType
    _sum?: ChapelSessionSumAggregateInputType
    _min?: ChapelSessionMinAggregateInputType
    _max?: ChapelSessionMaxAggregateInputType
  }

  export type ChapelSessionGroupByOutputType = {
    id: number
    title: string
    date: Date
    speakerId: number | null
    _count: ChapelSessionCountAggregateOutputType | null
    _avg: ChapelSessionAvgAggregateOutputType | null
    _sum: ChapelSessionSumAggregateOutputType | null
    _min: ChapelSessionMinAggregateOutputType | null
    _max: ChapelSessionMaxAggregateOutputType | null
  }

  type GetChapelSessionGroupByPayload<T extends ChapelSessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ChapelSessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChapelSessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChapelSessionGroupByOutputType[P]>
            : GetScalarType<T[P], ChapelSessionGroupByOutputType[P]>
        }
      >
    >


  export type ChapelSessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    date?: boolean
    speakerId?: boolean
    speaker?: boolean | ChapelSession$speakerArgs<ExtArgs>
    feedbacks?: boolean | ChapelSession$feedbacksArgs<ExtArgs>
    _count?: boolean | ChapelSessionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["chapelSession"]>

  export type ChapelSessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    date?: boolean
    speakerId?: boolean
    speaker?: boolean | ChapelSession$speakerArgs<ExtArgs>
  }, ExtArgs["result"]["chapelSession"]>

  export type ChapelSessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    date?: boolean
    speakerId?: boolean
    speaker?: boolean | ChapelSession$speakerArgs<ExtArgs>
  }, ExtArgs["result"]["chapelSession"]>

  export type ChapelSessionSelectScalar = {
    id?: boolean
    title?: boolean
    date?: boolean
    speakerId?: boolean
  }

  export type ChapelSessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "date" | "speakerId", ExtArgs["result"]["chapelSession"]>
  export type ChapelSessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    speaker?: boolean | ChapelSession$speakerArgs<ExtArgs>
    feedbacks?: boolean | ChapelSession$feedbacksArgs<ExtArgs>
    _count?: boolean | ChapelSessionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ChapelSessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    speaker?: boolean | ChapelSession$speakerArgs<ExtArgs>
  }
  export type ChapelSessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    speaker?: boolean | ChapelSession$speakerArgs<ExtArgs>
  }

  export type $ChapelSessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ChapelSession"
    objects: {
      speaker: Prisma.$SpeakerPayload<ExtArgs> | null
      feedbacks: Prisma.$FeedbackPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string
      date: Date
      speakerId: number | null
    }, ExtArgs["result"]["chapelSession"]>
    composites: {}
  }

  type ChapelSessionGetPayload<S extends boolean | null | undefined | ChapelSessionDefaultArgs> = $Result.GetResult<Prisma.$ChapelSessionPayload, S>

  type ChapelSessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ChapelSessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ChapelSessionCountAggregateInputType | true
    }

  export interface ChapelSessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ChapelSession'], meta: { name: 'ChapelSession' } }
    /**
     * Find zero or one ChapelSession that matches the filter.
     * @param {ChapelSessionFindUniqueArgs} args - Arguments to find a ChapelSession
     * @example
     * // Get one ChapelSession
     * const chapelSession = await prisma.chapelSession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ChapelSessionFindUniqueArgs>(args: SelectSubset<T, ChapelSessionFindUniqueArgs<ExtArgs>>): Prisma__ChapelSessionClient<$Result.GetResult<Prisma.$ChapelSessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ChapelSession that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ChapelSessionFindUniqueOrThrowArgs} args - Arguments to find a ChapelSession
     * @example
     * // Get one ChapelSession
     * const chapelSession = await prisma.chapelSession.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ChapelSessionFindUniqueOrThrowArgs>(args: SelectSubset<T, ChapelSessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ChapelSessionClient<$Result.GetResult<Prisma.$ChapelSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ChapelSession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChapelSessionFindFirstArgs} args - Arguments to find a ChapelSession
     * @example
     * // Get one ChapelSession
     * const chapelSession = await prisma.chapelSession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ChapelSessionFindFirstArgs>(args?: SelectSubset<T, ChapelSessionFindFirstArgs<ExtArgs>>): Prisma__ChapelSessionClient<$Result.GetResult<Prisma.$ChapelSessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ChapelSession that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChapelSessionFindFirstOrThrowArgs} args - Arguments to find a ChapelSession
     * @example
     * // Get one ChapelSession
     * const chapelSession = await prisma.chapelSession.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ChapelSessionFindFirstOrThrowArgs>(args?: SelectSubset<T, ChapelSessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__ChapelSessionClient<$Result.GetResult<Prisma.$ChapelSessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ChapelSessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChapelSessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ChapelSessions
     * const chapelSessions = await prisma.chapelSession.findMany()
     * 
     * // Get first 10 ChapelSessions
     * const chapelSessions = await prisma.chapelSession.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const chapelSessionWithIdOnly = await prisma.chapelSession.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ChapelSessionFindManyArgs>(args?: SelectSubset<T, ChapelSessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChapelSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ChapelSession.
     * @param {ChapelSessionCreateArgs} args - Arguments to create a ChapelSession.
     * @example
     * // Create one ChapelSession
     * const ChapelSession = await prisma.chapelSession.create({
     *   data: {
     *     // ... data to create a ChapelSession
     *   }
     * })
     * 
     */
    create<T extends ChapelSessionCreateArgs>(args: SelectSubset<T, ChapelSessionCreateArgs<ExtArgs>>): Prisma__ChapelSessionClient<$Result.GetResult<Prisma.$ChapelSessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ChapelSessions.
     * @param {ChapelSessionCreateManyArgs} args - Arguments to create many ChapelSessions.
     * @example
     * // Create many ChapelSessions
     * const chapelSession = await prisma.chapelSession.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ChapelSessionCreateManyArgs>(args?: SelectSubset<T, ChapelSessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ChapelSessions and returns the data saved in the database.
     * @param {ChapelSessionCreateManyAndReturnArgs} args - Arguments to create many ChapelSessions.
     * @example
     * // Create many ChapelSessions
     * const chapelSession = await prisma.chapelSession.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ChapelSessions and only return the `id`
     * const chapelSessionWithIdOnly = await prisma.chapelSession.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ChapelSessionCreateManyAndReturnArgs>(args?: SelectSubset<T, ChapelSessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChapelSessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ChapelSession.
     * @param {ChapelSessionDeleteArgs} args - Arguments to delete one ChapelSession.
     * @example
     * // Delete one ChapelSession
     * const ChapelSession = await prisma.chapelSession.delete({
     *   where: {
     *     // ... filter to delete one ChapelSession
     *   }
     * })
     * 
     */
    delete<T extends ChapelSessionDeleteArgs>(args: SelectSubset<T, ChapelSessionDeleteArgs<ExtArgs>>): Prisma__ChapelSessionClient<$Result.GetResult<Prisma.$ChapelSessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ChapelSession.
     * @param {ChapelSessionUpdateArgs} args - Arguments to update one ChapelSession.
     * @example
     * // Update one ChapelSession
     * const chapelSession = await prisma.chapelSession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ChapelSessionUpdateArgs>(args: SelectSubset<T, ChapelSessionUpdateArgs<ExtArgs>>): Prisma__ChapelSessionClient<$Result.GetResult<Prisma.$ChapelSessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ChapelSessions.
     * @param {ChapelSessionDeleteManyArgs} args - Arguments to filter ChapelSessions to delete.
     * @example
     * // Delete a few ChapelSessions
     * const { count } = await prisma.chapelSession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ChapelSessionDeleteManyArgs>(args?: SelectSubset<T, ChapelSessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ChapelSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChapelSessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ChapelSessions
     * const chapelSession = await prisma.chapelSession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ChapelSessionUpdateManyArgs>(args: SelectSubset<T, ChapelSessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ChapelSessions and returns the data updated in the database.
     * @param {ChapelSessionUpdateManyAndReturnArgs} args - Arguments to update many ChapelSessions.
     * @example
     * // Update many ChapelSessions
     * const chapelSession = await prisma.chapelSession.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ChapelSessions and only return the `id`
     * const chapelSessionWithIdOnly = await prisma.chapelSession.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ChapelSessionUpdateManyAndReturnArgs>(args: SelectSubset<T, ChapelSessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChapelSessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ChapelSession.
     * @param {ChapelSessionUpsertArgs} args - Arguments to update or create a ChapelSession.
     * @example
     * // Update or create a ChapelSession
     * const chapelSession = await prisma.chapelSession.upsert({
     *   create: {
     *     // ... data to create a ChapelSession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ChapelSession we want to update
     *   }
     * })
     */
    upsert<T extends ChapelSessionUpsertArgs>(args: SelectSubset<T, ChapelSessionUpsertArgs<ExtArgs>>): Prisma__ChapelSessionClient<$Result.GetResult<Prisma.$ChapelSessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ChapelSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChapelSessionCountArgs} args - Arguments to filter ChapelSessions to count.
     * @example
     * // Count the number of ChapelSessions
     * const count = await prisma.chapelSession.count({
     *   where: {
     *     // ... the filter for the ChapelSessions we want to count
     *   }
     * })
    **/
    count<T extends ChapelSessionCountArgs>(
      args?: Subset<T, ChapelSessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChapelSessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ChapelSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChapelSessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ChapelSessionAggregateArgs>(args: Subset<T, ChapelSessionAggregateArgs>): Prisma.PrismaPromise<GetChapelSessionAggregateType<T>>

    /**
     * Group by ChapelSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChapelSessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ChapelSessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChapelSessionGroupByArgs['orderBy'] }
        : { orderBy?: ChapelSessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ChapelSessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChapelSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ChapelSession model
   */
  readonly fields: ChapelSessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ChapelSession.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ChapelSessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    speaker<T extends ChapelSession$speakerArgs<ExtArgs> = {}>(args?: Subset<T, ChapelSession$speakerArgs<ExtArgs>>): Prisma__SpeakerClient<$Result.GetResult<Prisma.$SpeakerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    feedbacks<T extends ChapelSession$feedbacksArgs<ExtArgs> = {}>(args?: Subset<T, ChapelSession$feedbacksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ChapelSession model
   */
  interface ChapelSessionFieldRefs {
    readonly id: FieldRef<"ChapelSession", 'Int'>
    readonly title: FieldRef<"ChapelSession", 'String'>
    readonly date: FieldRef<"ChapelSession", 'DateTime'>
    readonly speakerId: FieldRef<"ChapelSession", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * ChapelSession findUnique
   */
  export type ChapelSessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChapelSession
     */
    select?: ChapelSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChapelSession
     */
    omit?: ChapelSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChapelSessionInclude<ExtArgs> | null
    /**
     * Filter, which ChapelSession to fetch.
     */
    where: ChapelSessionWhereUniqueInput
  }

  /**
   * ChapelSession findUniqueOrThrow
   */
  export type ChapelSessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChapelSession
     */
    select?: ChapelSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChapelSession
     */
    omit?: ChapelSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChapelSessionInclude<ExtArgs> | null
    /**
     * Filter, which ChapelSession to fetch.
     */
    where: ChapelSessionWhereUniqueInput
  }

  /**
   * ChapelSession findFirst
   */
  export type ChapelSessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChapelSession
     */
    select?: ChapelSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChapelSession
     */
    omit?: ChapelSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChapelSessionInclude<ExtArgs> | null
    /**
     * Filter, which ChapelSession to fetch.
     */
    where?: ChapelSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChapelSessions to fetch.
     */
    orderBy?: ChapelSessionOrderByWithRelationInput | ChapelSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChapelSessions.
     */
    cursor?: ChapelSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChapelSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChapelSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChapelSessions.
     */
    distinct?: ChapelSessionScalarFieldEnum | ChapelSessionScalarFieldEnum[]
  }

  /**
   * ChapelSession findFirstOrThrow
   */
  export type ChapelSessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChapelSession
     */
    select?: ChapelSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChapelSession
     */
    omit?: ChapelSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChapelSessionInclude<ExtArgs> | null
    /**
     * Filter, which ChapelSession to fetch.
     */
    where?: ChapelSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChapelSessions to fetch.
     */
    orderBy?: ChapelSessionOrderByWithRelationInput | ChapelSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChapelSessions.
     */
    cursor?: ChapelSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChapelSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChapelSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChapelSessions.
     */
    distinct?: ChapelSessionScalarFieldEnum | ChapelSessionScalarFieldEnum[]
  }

  /**
   * ChapelSession findMany
   */
  export type ChapelSessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChapelSession
     */
    select?: ChapelSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChapelSession
     */
    omit?: ChapelSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChapelSessionInclude<ExtArgs> | null
    /**
     * Filter, which ChapelSessions to fetch.
     */
    where?: ChapelSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChapelSessions to fetch.
     */
    orderBy?: ChapelSessionOrderByWithRelationInput | ChapelSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ChapelSessions.
     */
    cursor?: ChapelSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChapelSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChapelSessions.
     */
    skip?: number
    distinct?: ChapelSessionScalarFieldEnum | ChapelSessionScalarFieldEnum[]
  }

  /**
   * ChapelSession create
   */
  export type ChapelSessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChapelSession
     */
    select?: ChapelSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChapelSession
     */
    omit?: ChapelSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChapelSessionInclude<ExtArgs> | null
    /**
     * The data needed to create a ChapelSession.
     */
    data: XOR<ChapelSessionCreateInput, ChapelSessionUncheckedCreateInput>
  }

  /**
   * ChapelSession createMany
   */
  export type ChapelSessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ChapelSessions.
     */
    data: ChapelSessionCreateManyInput | ChapelSessionCreateManyInput[]
  }

  /**
   * ChapelSession createManyAndReturn
   */
  export type ChapelSessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChapelSession
     */
    select?: ChapelSessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ChapelSession
     */
    omit?: ChapelSessionOmit<ExtArgs> | null
    /**
     * The data used to create many ChapelSessions.
     */
    data: ChapelSessionCreateManyInput | ChapelSessionCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChapelSessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ChapelSession update
   */
  export type ChapelSessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChapelSession
     */
    select?: ChapelSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChapelSession
     */
    omit?: ChapelSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChapelSessionInclude<ExtArgs> | null
    /**
     * The data needed to update a ChapelSession.
     */
    data: XOR<ChapelSessionUpdateInput, ChapelSessionUncheckedUpdateInput>
    /**
     * Choose, which ChapelSession to update.
     */
    where: ChapelSessionWhereUniqueInput
  }

  /**
   * ChapelSession updateMany
   */
  export type ChapelSessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ChapelSessions.
     */
    data: XOR<ChapelSessionUpdateManyMutationInput, ChapelSessionUncheckedUpdateManyInput>
    /**
     * Filter which ChapelSessions to update
     */
    where?: ChapelSessionWhereInput
    /**
     * Limit how many ChapelSessions to update.
     */
    limit?: number
  }

  /**
   * ChapelSession updateManyAndReturn
   */
  export type ChapelSessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChapelSession
     */
    select?: ChapelSessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ChapelSession
     */
    omit?: ChapelSessionOmit<ExtArgs> | null
    /**
     * The data used to update ChapelSessions.
     */
    data: XOR<ChapelSessionUpdateManyMutationInput, ChapelSessionUncheckedUpdateManyInput>
    /**
     * Filter which ChapelSessions to update
     */
    where?: ChapelSessionWhereInput
    /**
     * Limit how many ChapelSessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChapelSessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ChapelSession upsert
   */
  export type ChapelSessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChapelSession
     */
    select?: ChapelSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChapelSession
     */
    omit?: ChapelSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChapelSessionInclude<ExtArgs> | null
    /**
     * The filter to search for the ChapelSession to update in case it exists.
     */
    where: ChapelSessionWhereUniqueInput
    /**
     * In case the ChapelSession found by the `where` argument doesn't exist, create a new ChapelSession with this data.
     */
    create: XOR<ChapelSessionCreateInput, ChapelSessionUncheckedCreateInput>
    /**
     * In case the ChapelSession was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ChapelSessionUpdateInput, ChapelSessionUncheckedUpdateInput>
  }

  /**
   * ChapelSession delete
   */
  export type ChapelSessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChapelSession
     */
    select?: ChapelSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChapelSession
     */
    omit?: ChapelSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChapelSessionInclude<ExtArgs> | null
    /**
     * Filter which ChapelSession to delete.
     */
    where: ChapelSessionWhereUniqueInput
  }

  /**
   * ChapelSession deleteMany
   */
  export type ChapelSessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChapelSessions to delete
     */
    where?: ChapelSessionWhereInput
    /**
     * Limit how many ChapelSessions to delete.
     */
    limit?: number
  }

  /**
   * ChapelSession.speaker
   */
  export type ChapelSession$speakerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Speaker
     */
    select?: SpeakerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Speaker
     */
    omit?: SpeakerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpeakerInclude<ExtArgs> | null
    where?: SpeakerWhereInput
  }

  /**
   * ChapelSession.feedbacks
   */
  export type ChapelSession$feedbacksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    where?: FeedbackWhereInput
    orderBy?: FeedbackOrderByWithRelationInput | FeedbackOrderByWithRelationInput[]
    cursor?: FeedbackWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FeedbackScalarFieldEnum | FeedbackScalarFieldEnum[]
  }

  /**
   * ChapelSession without action
   */
  export type ChapelSessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChapelSession
     */
    select?: ChapelSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChapelSession
     */
    omit?: ChapelSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChapelSessionInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    email: string | null
    name: string | null
    userType: $Enums.UserType | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    email: string | null
    name: string | null
    userType: $Enums.UserType | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    userType: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    userType?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    userType?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    userType?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    email: string
    name: string | null
    userType: $Enums.UserType
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    userType?: boolean
    feedbacks?: boolean | User$feedbacksArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    userType?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    userType?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    userType?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "userType", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    feedbacks?: boolean | User$feedbacksArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      feedbacks: Prisma.$FeedbackPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      email: string
      name: string | null
      userType: $Enums.UserType
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    feedbacks<T extends User$feedbacksArgs<ExtArgs> = {}>(args?: Subset<T, User$feedbacksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly userType: FieldRef<"User", 'UserType'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.feedbacks
   */
  export type User$feedbacksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    where?: FeedbackWhereInput
    orderBy?: FeedbackOrderByWithRelationInput | FeedbackOrderByWithRelationInput[]
    cursor?: FeedbackWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FeedbackScalarFieldEnum | FeedbackScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Feedback
   */

  export type AggregateFeedback = {
    _count: FeedbackCountAggregateOutputType | null
    _avg: FeedbackAvgAggregateOutputType | null
    _sum: FeedbackSumAggregateOutputType | null
    _min: FeedbackMinAggregateOutputType | null
    _max: FeedbackMaxAggregateOutputType | null
  }

  export type FeedbackAvgAggregateOutputType = {
    id: number | null
    authorId: number | null
    chapelSessionId: number | null
  }

  export type FeedbackSumAggregateOutputType = {
    id: number | null
    authorId: number | null
    chapelSessionId: number | null
  }

  export type FeedbackMinAggregateOutputType = {
    id: number | null
    title: string | null
    content: string | null
    published: boolean | null
    authorId: number | null
    chapelSessionId: number | null
  }

  export type FeedbackMaxAggregateOutputType = {
    id: number | null
    title: string | null
    content: string | null
    published: boolean | null
    authorId: number | null
    chapelSessionId: number | null
  }

  export type FeedbackCountAggregateOutputType = {
    id: number
    title: number
    content: number
    published: number
    authorId: number
    chapelSessionId: number
    _all: number
  }


  export type FeedbackAvgAggregateInputType = {
    id?: true
    authorId?: true
    chapelSessionId?: true
  }

  export type FeedbackSumAggregateInputType = {
    id?: true
    authorId?: true
    chapelSessionId?: true
  }

  export type FeedbackMinAggregateInputType = {
    id?: true
    title?: true
    content?: true
    published?: true
    authorId?: true
    chapelSessionId?: true
  }

  export type FeedbackMaxAggregateInputType = {
    id?: true
    title?: true
    content?: true
    published?: true
    authorId?: true
    chapelSessionId?: true
  }

  export type FeedbackCountAggregateInputType = {
    id?: true
    title?: true
    content?: true
    published?: true
    authorId?: true
    chapelSessionId?: true
    _all?: true
  }

  export type FeedbackAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Feedback to aggregate.
     */
    where?: FeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Feedbacks to fetch.
     */
    orderBy?: FeedbackOrderByWithRelationInput | FeedbackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Feedbacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Feedbacks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Feedbacks
    **/
    _count?: true | FeedbackCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FeedbackAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FeedbackSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FeedbackMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FeedbackMaxAggregateInputType
  }

  export type GetFeedbackAggregateType<T extends FeedbackAggregateArgs> = {
        [P in keyof T & keyof AggregateFeedback]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFeedback[P]>
      : GetScalarType<T[P], AggregateFeedback[P]>
  }




  export type FeedbackGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FeedbackWhereInput
    orderBy?: FeedbackOrderByWithAggregationInput | FeedbackOrderByWithAggregationInput[]
    by: FeedbackScalarFieldEnum[] | FeedbackScalarFieldEnum
    having?: FeedbackScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FeedbackCountAggregateInputType | true
    _avg?: FeedbackAvgAggregateInputType
    _sum?: FeedbackSumAggregateInputType
    _min?: FeedbackMinAggregateInputType
    _max?: FeedbackMaxAggregateInputType
  }

  export type FeedbackGroupByOutputType = {
    id: number
    title: string
    content: string | null
    published: boolean
    authorId: number
    chapelSessionId: number | null
    _count: FeedbackCountAggregateOutputType | null
    _avg: FeedbackAvgAggregateOutputType | null
    _sum: FeedbackSumAggregateOutputType | null
    _min: FeedbackMinAggregateOutputType | null
    _max: FeedbackMaxAggregateOutputType | null
  }

  type GetFeedbackGroupByPayload<T extends FeedbackGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FeedbackGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FeedbackGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FeedbackGroupByOutputType[P]>
            : GetScalarType<T[P], FeedbackGroupByOutputType[P]>
        }
      >
    >


  export type FeedbackSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    published?: boolean
    authorId?: boolean
    chapelSessionId?: boolean
    author?: boolean | UserDefaultArgs<ExtArgs>
    chapelSession?: boolean | Feedback$chapelSessionArgs<ExtArgs>
  }, ExtArgs["result"]["feedback"]>

  export type FeedbackSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    published?: boolean
    authorId?: boolean
    chapelSessionId?: boolean
    author?: boolean | UserDefaultArgs<ExtArgs>
    chapelSession?: boolean | Feedback$chapelSessionArgs<ExtArgs>
  }, ExtArgs["result"]["feedback"]>

  export type FeedbackSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    published?: boolean
    authorId?: boolean
    chapelSessionId?: boolean
    author?: boolean | UserDefaultArgs<ExtArgs>
    chapelSession?: boolean | Feedback$chapelSessionArgs<ExtArgs>
  }, ExtArgs["result"]["feedback"]>

  export type FeedbackSelectScalar = {
    id?: boolean
    title?: boolean
    content?: boolean
    published?: boolean
    authorId?: boolean
    chapelSessionId?: boolean
  }

  export type FeedbackOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "content" | "published" | "authorId" | "chapelSessionId", ExtArgs["result"]["feedback"]>
  export type FeedbackInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    author?: boolean | UserDefaultArgs<ExtArgs>
    chapelSession?: boolean | Feedback$chapelSessionArgs<ExtArgs>
  }
  export type FeedbackIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    author?: boolean | UserDefaultArgs<ExtArgs>
    chapelSession?: boolean | Feedback$chapelSessionArgs<ExtArgs>
  }
  export type FeedbackIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    author?: boolean | UserDefaultArgs<ExtArgs>
    chapelSession?: boolean | Feedback$chapelSessionArgs<ExtArgs>
  }

  export type $FeedbackPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Feedback"
    objects: {
      author: Prisma.$UserPayload<ExtArgs>
      chapelSession: Prisma.$ChapelSessionPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string
      content: string | null
      published: boolean
      authorId: number
      chapelSessionId: number | null
    }, ExtArgs["result"]["feedback"]>
    composites: {}
  }

  type FeedbackGetPayload<S extends boolean | null | undefined | FeedbackDefaultArgs> = $Result.GetResult<Prisma.$FeedbackPayload, S>

  type FeedbackCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FeedbackFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FeedbackCountAggregateInputType | true
    }

  export interface FeedbackDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Feedback'], meta: { name: 'Feedback' } }
    /**
     * Find zero or one Feedback that matches the filter.
     * @param {FeedbackFindUniqueArgs} args - Arguments to find a Feedback
     * @example
     * // Get one Feedback
     * const feedback = await prisma.feedback.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FeedbackFindUniqueArgs>(args: SelectSubset<T, FeedbackFindUniqueArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Feedback that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FeedbackFindUniqueOrThrowArgs} args - Arguments to find a Feedback
     * @example
     * // Get one Feedback
     * const feedback = await prisma.feedback.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FeedbackFindUniqueOrThrowArgs>(args: SelectSubset<T, FeedbackFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Feedback that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackFindFirstArgs} args - Arguments to find a Feedback
     * @example
     * // Get one Feedback
     * const feedback = await prisma.feedback.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FeedbackFindFirstArgs>(args?: SelectSubset<T, FeedbackFindFirstArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Feedback that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackFindFirstOrThrowArgs} args - Arguments to find a Feedback
     * @example
     * // Get one Feedback
     * const feedback = await prisma.feedback.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FeedbackFindFirstOrThrowArgs>(args?: SelectSubset<T, FeedbackFindFirstOrThrowArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Feedbacks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Feedbacks
     * const feedbacks = await prisma.feedback.findMany()
     * 
     * // Get first 10 Feedbacks
     * const feedbacks = await prisma.feedback.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const feedbackWithIdOnly = await prisma.feedback.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FeedbackFindManyArgs>(args?: SelectSubset<T, FeedbackFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Feedback.
     * @param {FeedbackCreateArgs} args - Arguments to create a Feedback.
     * @example
     * // Create one Feedback
     * const Feedback = await prisma.feedback.create({
     *   data: {
     *     // ... data to create a Feedback
     *   }
     * })
     * 
     */
    create<T extends FeedbackCreateArgs>(args: SelectSubset<T, FeedbackCreateArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Feedbacks.
     * @param {FeedbackCreateManyArgs} args - Arguments to create many Feedbacks.
     * @example
     * // Create many Feedbacks
     * const feedback = await prisma.feedback.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FeedbackCreateManyArgs>(args?: SelectSubset<T, FeedbackCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Feedbacks and returns the data saved in the database.
     * @param {FeedbackCreateManyAndReturnArgs} args - Arguments to create many Feedbacks.
     * @example
     * // Create many Feedbacks
     * const feedback = await prisma.feedback.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Feedbacks and only return the `id`
     * const feedbackWithIdOnly = await prisma.feedback.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FeedbackCreateManyAndReturnArgs>(args?: SelectSubset<T, FeedbackCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Feedback.
     * @param {FeedbackDeleteArgs} args - Arguments to delete one Feedback.
     * @example
     * // Delete one Feedback
     * const Feedback = await prisma.feedback.delete({
     *   where: {
     *     // ... filter to delete one Feedback
     *   }
     * })
     * 
     */
    delete<T extends FeedbackDeleteArgs>(args: SelectSubset<T, FeedbackDeleteArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Feedback.
     * @param {FeedbackUpdateArgs} args - Arguments to update one Feedback.
     * @example
     * // Update one Feedback
     * const feedback = await prisma.feedback.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FeedbackUpdateArgs>(args: SelectSubset<T, FeedbackUpdateArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Feedbacks.
     * @param {FeedbackDeleteManyArgs} args - Arguments to filter Feedbacks to delete.
     * @example
     * // Delete a few Feedbacks
     * const { count } = await prisma.feedback.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FeedbackDeleteManyArgs>(args?: SelectSubset<T, FeedbackDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Feedbacks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Feedbacks
     * const feedback = await prisma.feedback.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FeedbackUpdateManyArgs>(args: SelectSubset<T, FeedbackUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Feedbacks and returns the data updated in the database.
     * @param {FeedbackUpdateManyAndReturnArgs} args - Arguments to update many Feedbacks.
     * @example
     * // Update many Feedbacks
     * const feedback = await prisma.feedback.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Feedbacks and only return the `id`
     * const feedbackWithIdOnly = await prisma.feedback.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FeedbackUpdateManyAndReturnArgs>(args: SelectSubset<T, FeedbackUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Feedback.
     * @param {FeedbackUpsertArgs} args - Arguments to update or create a Feedback.
     * @example
     * // Update or create a Feedback
     * const feedback = await prisma.feedback.upsert({
     *   create: {
     *     // ... data to create a Feedback
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Feedback we want to update
     *   }
     * })
     */
    upsert<T extends FeedbackUpsertArgs>(args: SelectSubset<T, FeedbackUpsertArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Feedbacks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackCountArgs} args - Arguments to filter Feedbacks to count.
     * @example
     * // Count the number of Feedbacks
     * const count = await prisma.feedback.count({
     *   where: {
     *     // ... the filter for the Feedbacks we want to count
     *   }
     * })
    **/
    count<T extends FeedbackCountArgs>(
      args?: Subset<T, FeedbackCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FeedbackCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Feedback.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FeedbackAggregateArgs>(args: Subset<T, FeedbackAggregateArgs>): Prisma.PrismaPromise<GetFeedbackAggregateType<T>>

    /**
     * Group by Feedback.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FeedbackGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FeedbackGroupByArgs['orderBy'] }
        : { orderBy?: FeedbackGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FeedbackGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFeedbackGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Feedback model
   */
  readonly fields: FeedbackFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Feedback.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FeedbackClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    author<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    chapelSession<T extends Feedback$chapelSessionArgs<ExtArgs> = {}>(args?: Subset<T, Feedback$chapelSessionArgs<ExtArgs>>): Prisma__ChapelSessionClient<$Result.GetResult<Prisma.$ChapelSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Feedback model
   */
  interface FeedbackFieldRefs {
    readonly id: FieldRef<"Feedback", 'Int'>
    readonly title: FieldRef<"Feedback", 'String'>
    readonly content: FieldRef<"Feedback", 'String'>
    readonly published: FieldRef<"Feedback", 'Boolean'>
    readonly authorId: FieldRef<"Feedback", 'Int'>
    readonly chapelSessionId: FieldRef<"Feedback", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Feedback findUnique
   */
  export type FeedbackFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    /**
     * Filter, which Feedback to fetch.
     */
    where: FeedbackWhereUniqueInput
  }

  /**
   * Feedback findUniqueOrThrow
   */
  export type FeedbackFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    /**
     * Filter, which Feedback to fetch.
     */
    where: FeedbackWhereUniqueInput
  }

  /**
   * Feedback findFirst
   */
  export type FeedbackFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    /**
     * Filter, which Feedback to fetch.
     */
    where?: FeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Feedbacks to fetch.
     */
    orderBy?: FeedbackOrderByWithRelationInput | FeedbackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Feedbacks.
     */
    cursor?: FeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Feedbacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Feedbacks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Feedbacks.
     */
    distinct?: FeedbackScalarFieldEnum | FeedbackScalarFieldEnum[]
  }

  /**
   * Feedback findFirstOrThrow
   */
  export type FeedbackFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    /**
     * Filter, which Feedback to fetch.
     */
    where?: FeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Feedbacks to fetch.
     */
    orderBy?: FeedbackOrderByWithRelationInput | FeedbackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Feedbacks.
     */
    cursor?: FeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Feedbacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Feedbacks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Feedbacks.
     */
    distinct?: FeedbackScalarFieldEnum | FeedbackScalarFieldEnum[]
  }

  /**
   * Feedback findMany
   */
  export type FeedbackFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    /**
     * Filter, which Feedbacks to fetch.
     */
    where?: FeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Feedbacks to fetch.
     */
    orderBy?: FeedbackOrderByWithRelationInput | FeedbackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Feedbacks.
     */
    cursor?: FeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Feedbacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Feedbacks.
     */
    skip?: number
    distinct?: FeedbackScalarFieldEnum | FeedbackScalarFieldEnum[]
  }

  /**
   * Feedback create
   */
  export type FeedbackCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    /**
     * The data needed to create a Feedback.
     */
    data: XOR<FeedbackCreateInput, FeedbackUncheckedCreateInput>
  }

  /**
   * Feedback createMany
   */
  export type FeedbackCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Feedbacks.
     */
    data: FeedbackCreateManyInput | FeedbackCreateManyInput[]
  }

  /**
   * Feedback createManyAndReturn
   */
  export type FeedbackCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * The data used to create many Feedbacks.
     */
    data: FeedbackCreateManyInput | FeedbackCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Feedback update
   */
  export type FeedbackUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    /**
     * The data needed to update a Feedback.
     */
    data: XOR<FeedbackUpdateInput, FeedbackUncheckedUpdateInput>
    /**
     * Choose, which Feedback to update.
     */
    where: FeedbackWhereUniqueInput
  }

  /**
   * Feedback updateMany
   */
  export type FeedbackUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Feedbacks.
     */
    data: XOR<FeedbackUpdateManyMutationInput, FeedbackUncheckedUpdateManyInput>
    /**
     * Filter which Feedbacks to update
     */
    where?: FeedbackWhereInput
    /**
     * Limit how many Feedbacks to update.
     */
    limit?: number
  }

  /**
   * Feedback updateManyAndReturn
   */
  export type FeedbackUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * The data used to update Feedbacks.
     */
    data: XOR<FeedbackUpdateManyMutationInput, FeedbackUncheckedUpdateManyInput>
    /**
     * Filter which Feedbacks to update
     */
    where?: FeedbackWhereInput
    /**
     * Limit how many Feedbacks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Feedback upsert
   */
  export type FeedbackUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    /**
     * The filter to search for the Feedback to update in case it exists.
     */
    where: FeedbackWhereUniqueInput
    /**
     * In case the Feedback found by the `where` argument doesn't exist, create a new Feedback with this data.
     */
    create: XOR<FeedbackCreateInput, FeedbackUncheckedCreateInput>
    /**
     * In case the Feedback was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FeedbackUpdateInput, FeedbackUncheckedUpdateInput>
  }

  /**
   * Feedback delete
   */
  export type FeedbackDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    /**
     * Filter which Feedback to delete.
     */
    where: FeedbackWhereUniqueInput
  }

  /**
   * Feedback deleteMany
   */
  export type FeedbackDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Feedbacks to delete
     */
    where?: FeedbackWhereInput
    /**
     * Limit how many Feedbacks to delete.
     */
    limit?: number
  }

  /**
   * Feedback.chapelSession
   */
  export type Feedback$chapelSessionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChapelSession
     */
    select?: ChapelSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChapelSession
     */
    omit?: ChapelSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChapelSessionInclude<ExtArgs> | null
    where?: ChapelSessionWhereInput
  }

  /**
   * Feedback without action
   */
  export type FeedbackDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
  }


  /**
   * Model Task
   */

  export type AggregateTask = {
    _count: TaskCountAggregateOutputType | null
    _avg: TaskAvgAggregateOutputType | null
    _sum: TaskSumAggregateOutputType | null
    _min: TaskMinAggregateOutputType | null
    _max: TaskMaxAggregateOutputType | null
  }

  export type TaskAvgAggregateOutputType = {
    id: number | null
  }

  export type TaskSumAggregateOutputType = {
    id: number | null
  }

  export type TaskMinAggregateOutputType = {
    id: number | null
    title: string | null
    completed: boolean | null
  }

  export type TaskMaxAggregateOutputType = {
    id: number | null
    title: string | null
    completed: boolean | null
  }

  export type TaskCountAggregateOutputType = {
    id: number
    title: number
    completed: number
    _all: number
  }


  export type TaskAvgAggregateInputType = {
    id?: true
  }

  export type TaskSumAggregateInputType = {
    id?: true
  }

  export type TaskMinAggregateInputType = {
    id?: true
    title?: true
    completed?: true
  }

  export type TaskMaxAggregateInputType = {
    id?: true
    title?: true
    completed?: true
  }

  export type TaskCountAggregateInputType = {
    id?: true
    title?: true
    completed?: true
    _all?: true
  }

  export type TaskAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Task to aggregate.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tasks
    **/
    _count?: true | TaskCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TaskAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TaskSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TaskMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TaskMaxAggregateInputType
  }

  export type GetTaskAggregateType<T extends TaskAggregateArgs> = {
        [P in keyof T & keyof AggregateTask]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTask[P]>
      : GetScalarType<T[P], AggregateTask[P]>
  }




  export type TaskGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithAggregationInput | TaskOrderByWithAggregationInput[]
    by: TaskScalarFieldEnum[] | TaskScalarFieldEnum
    having?: TaskScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TaskCountAggregateInputType | true
    _avg?: TaskAvgAggregateInputType
    _sum?: TaskSumAggregateInputType
    _min?: TaskMinAggregateInputType
    _max?: TaskMaxAggregateInputType
  }

  export type TaskGroupByOutputType = {
    id: number
    title: string
    completed: boolean
    _count: TaskCountAggregateOutputType | null
    _avg: TaskAvgAggregateOutputType | null
    _sum: TaskSumAggregateOutputType | null
    _min: TaskMinAggregateOutputType | null
    _max: TaskMaxAggregateOutputType | null
  }

  type GetTaskGroupByPayload<T extends TaskGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TaskGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TaskGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TaskGroupByOutputType[P]>
            : GetScalarType<T[P], TaskGroupByOutputType[P]>
        }
      >
    >


  export type TaskSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    completed?: boolean
  }, ExtArgs["result"]["task"]>

  export type TaskSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    completed?: boolean
  }, ExtArgs["result"]["task"]>

  export type TaskSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    completed?: boolean
  }, ExtArgs["result"]["task"]>

  export type TaskSelectScalar = {
    id?: boolean
    title?: boolean
    completed?: boolean
  }

  export type TaskOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "completed", ExtArgs["result"]["task"]>

  export type $TaskPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Task"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string
      completed: boolean
    }, ExtArgs["result"]["task"]>
    composites: {}
  }

  type TaskGetPayload<S extends boolean | null | undefined | TaskDefaultArgs> = $Result.GetResult<Prisma.$TaskPayload, S>

  type TaskCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TaskFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TaskCountAggregateInputType | true
    }

  export interface TaskDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Task'], meta: { name: 'Task' } }
    /**
     * Find zero or one Task that matches the filter.
     * @param {TaskFindUniqueArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TaskFindUniqueArgs>(args: SelectSubset<T, TaskFindUniqueArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Task that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TaskFindUniqueOrThrowArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TaskFindUniqueOrThrowArgs>(args: SelectSubset<T, TaskFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Task that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindFirstArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TaskFindFirstArgs>(args?: SelectSubset<T, TaskFindFirstArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Task that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindFirstOrThrowArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TaskFindFirstOrThrowArgs>(args?: SelectSubset<T, TaskFindFirstOrThrowArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tasks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tasks
     * const tasks = await prisma.task.findMany()
     * 
     * // Get first 10 Tasks
     * const tasks = await prisma.task.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const taskWithIdOnly = await prisma.task.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TaskFindManyArgs>(args?: SelectSubset<T, TaskFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Task.
     * @param {TaskCreateArgs} args - Arguments to create a Task.
     * @example
     * // Create one Task
     * const Task = await prisma.task.create({
     *   data: {
     *     // ... data to create a Task
     *   }
     * })
     * 
     */
    create<T extends TaskCreateArgs>(args: SelectSubset<T, TaskCreateArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tasks.
     * @param {TaskCreateManyArgs} args - Arguments to create many Tasks.
     * @example
     * // Create many Tasks
     * const task = await prisma.task.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TaskCreateManyArgs>(args?: SelectSubset<T, TaskCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tasks and returns the data saved in the database.
     * @param {TaskCreateManyAndReturnArgs} args - Arguments to create many Tasks.
     * @example
     * // Create many Tasks
     * const task = await prisma.task.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tasks and only return the `id`
     * const taskWithIdOnly = await prisma.task.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TaskCreateManyAndReturnArgs>(args?: SelectSubset<T, TaskCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Task.
     * @param {TaskDeleteArgs} args - Arguments to delete one Task.
     * @example
     * // Delete one Task
     * const Task = await prisma.task.delete({
     *   where: {
     *     // ... filter to delete one Task
     *   }
     * })
     * 
     */
    delete<T extends TaskDeleteArgs>(args: SelectSubset<T, TaskDeleteArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Task.
     * @param {TaskUpdateArgs} args - Arguments to update one Task.
     * @example
     * // Update one Task
     * const task = await prisma.task.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TaskUpdateArgs>(args: SelectSubset<T, TaskUpdateArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tasks.
     * @param {TaskDeleteManyArgs} args - Arguments to filter Tasks to delete.
     * @example
     * // Delete a few Tasks
     * const { count } = await prisma.task.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TaskDeleteManyArgs>(args?: SelectSubset<T, TaskDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tasks
     * const task = await prisma.task.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TaskUpdateManyArgs>(args: SelectSubset<T, TaskUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tasks and returns the data updated in the database.
     * @param {TaskUpdateManyAndReturnArgs} args - Arguments to update many Tasks.
     * @example
     * // Update many Tasks
     * const task = await prisma.task.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tasks and only return the `id`
     * const taskWithIdOnly = await prisma.task.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TaskUpdateManyAndReturnArgs>(args: SelectSubset<T, TaskUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Task.
     * @param {TaskUpsertArgs} args - Arguments to update or create a Task.
     * @example
     * // Update or create a Task
     * const task = await prisma.task.upsert({
     *   create: {
     *     // ... data to create a Task
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Task we want to update
     *   }
     * })
     */
    upsert<T extends TaskUpsertArgs>(args: SelectSubset<T, TaskUpsertArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskCountArgs} args - Arguments to filter Tasks to count.
     * @example
     * // Count the number of Tasks
     * const count = await prisma.task.count({
     *   where: {
     *     // ... the filter for the Tasks we want to count
     *   }
     * })
    **/
    count<T extends TaskCountArgs>(
      args?: Subset<T, TaskCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TaskCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Task.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TaskAggregateArgs>(args: Subset<T, TaskAggregateArgs>): Prisma.PrismaPromise<GetTaskAggregateType<T>>

    /**
     * Group by Task.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TaskGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TaskGroupByArgs['orderBy'] }
        : { orderBy?: TaskGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TaskGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTaskGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Task model
   */
  readonly fields: TaskFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Task.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TaskClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Task model
   */
  interface TaskFieldRefs {
    readonly id: FieldRef<"Task", 'Int'>
    readonly title: FieldRef<"Task", 'String'>
    readonly completed: FieldRef<"Task", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Task findUnique
   */
  export type TaskFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task findUniqueOrThrow
   */
  export type TaskFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task findFirst
   */
  export type TaskFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tasks.
     */
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task findFirstOrThrow
   */
  export type TaskFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tasks.
     */
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task findMany
   */
  export type TaskFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Filter, which Tasks to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task create
   */
  export type TaskCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * The data needed to create a Task.
     */
    data: XOR<TaskCreateInput, TaskUncheckedCreateInput>
  }

  /**
   * Task createMany
   */
  export type TaskCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tasks.
     */
    data: TaskCreateManyInput | TaskCreateManyInput[]
  }

  /**
   * Task createManyAndReturn
   */
  export type TaskCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * The data used to create many Tasks.
     */
    data: TaskCreateManyInput | TaskCreateManyInput[]
  }

  /**
   * Task update
   */
  export type TaskUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * The data needed to update a Task.
     */
    data: XOR<TaskUpdateInput, TaskUncheckedUpdateInput>
    /**
     * Choose, which Task to update.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task updateMany
   */
  export type TaskUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tasks.
     */
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyInput>
    /**
     * Filter which Tasks to update
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to update.
     */
    limit?: number
  }

  /**
   * Task updateManyAndReturn
   */
  export type TaskUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * The data used to update Tasks.
     */
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyInput>
    /**
     * Filter which Tasks to update
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to update.
     */
    limit?: number
  }

  /**
   * Task upsert
   */
  export type TaskUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * The filter to search for the Task to update in case it exists.
     */
    where: TaskWhereUniqueInput
    /**
     * In case the Task found by the `where` argument doesn't exist, create a new Task with this data.
     */
    create: XOR<TaskCreateInput, TaskUncheckedCreateInput>
    /**
     * In case the Task was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TaskUpdateInput, TaskUncheckedUpdateInput>
  }

  /**
   * Task delete
   */
  export type TaskDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Filter which Task to delete.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task deleteMany
   */
  export type TaskDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tasks to delete
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to delete.
     */
    limit?: number
  }

  /**
   * Task without action
   */
  export type TaskDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const SpeakerScalarFieldEnum: {
    id: 'id',
    name: 'name'
  };

  export type SpeakerScalarFieldEnum = (typeof SpeakerScalarFieldEnum)[keyof typeof SpeakerScalarFieldEnum]


  export const ChapelSessionScalarFieldEnum: {
    id: 'id',
    title: 'title',
    date: 'date',
    speakerId: 'speakerId'
  };

  export type ChapelSessionScalarFieldEnum = (typeof ChapelSessionScalarFieldEnum)[keyof typeof ChapelSessionScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    userType: 'userType'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const FeedbackScalarFieldEnum: {
    id: 'id',
    title: 'title',
    content: 'content',
    published: 'published',
    authorId: 'authorId',
    chapelSessionId: 'chapelSessionId'
  };

  export type FeedbackScalarFieldEnum = (typeof FeedbackScalarFieldEnum)[keyof typeof FeedbackScalarFieldEnum]


  export const TaskScalarFieldEnum: {
    id: 'id',
    title: 'title',
    completed: 'completed'
  };

  export type TaskScalarFieldEnum = (typeof TaskScalarFieldEnum)[keyof typeof TaskScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'UserType'
   */
  export type EnumUserTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserType'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type SpeakerWhereInput = {
    AND?: SpeakerWhereInput | SpeakerWhereInput[]
    OR?: SpeakerWhereInput[]
    NOT?: SpeakerWhereInput | SpeakerWhereInput[]
    id?: IntFilter<"Speaker"> | number
    name?: StringFilter<"Speaker"> | string
    chapelSessions?: ChapelSessionListRelationFilter
  }

  export type SpeakerOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    chapelSessions?: ChapelSessionOrderByRelationAggregateInput
  }

  export type SpeakerWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: SpeakerWhereInput | SpeakerWhereInput[]
    OR?: SpeakerWhereInput[]
    NOT?: SpeakerWhereInput | SpeakerWhereInput[]
    name?: StringFilter<"Speaker"> | string
    chapelSessions?: ChapelSessionListRelationFilter
  }, "id">

  export type SpeakerOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    _count?: SpeakerCountOrderByAggregateInput
    _avg?: SpeakerAvgOrderByAggregateInput
    _max?: SpeakerMaxOrderByAggregateInput
    _min?: SpeakerMinOrderByAggregateInput
    _sum?: SpeakerSumOrderByAggregateInput
  }

  export type SpeakerScalarWhereWithAggregatesInput = {
    AND?: SpeakerScalarWhereWithAggregatesInput | SpeakerScalarWhereWithAggregatesInput[]
    OR?: SpeakerScalarWhereWithAggregatesInput[]
    NOT?: SpeakerScalarWhereWithAggregatesInput | SpeakerScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Speaker"> | number
    name?: StringWithAggregatesFilter<"Speaker"> | string
  }

  export type ChapelSessionWhereInput = {
    AND?: ChapelSessionWhereInput | ChapelSessionWhereInput[]
    OR?: ChapelSessionWhereInput[]
    NOT?: ChapelSessionWhereInput | ChapelSessionWhereInput[]
    id?: IntFilter<"ChapelSession"> | number
    title?: StringFilter<"ChapelSession"> | string
    date?: DateTimeFilter<"ChapelSession"> | Date | string
    speakerId?: IntNullableFilter<"ChapelSession"> | number | null
    speaker?: XOR<SpeakerNullableScalarRelationFilter, SpeakerWhereInput> | null
    feedbacks?: FeedbackListRelationFilter
  }

  export type ChapelSessionOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    date?: SortOrder
    speakerId?: SortOrderInput | SortOrder
    speaker?: SpeakerOrderByWithRelationInput
    feedbacks?: FeedbackOrderByRelationAggregateInput
  }

  export type ChapelSessionWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ChapelSessionWhereInput | ChapelSessionWhereInput[]
    OR?: ChapelSessionWhereInput[]
    NOT?: ChapelSessionWhereInput | ChapelSessionWhereInput[]
    title?: StringFilter<"ChapelSession"> | string
    date?: DateTimeFilter<"ChapelSession"> | Date | string
    speakerId?: IntNullableFilter<"ChapelSession"> | number | null
    speaker?: XOR<SpeakerNullableScalarRelationFilter, SpeakerWhereInput> | null
    feedbacks?: FeedbackListRelationFilter
  }, "id">

  export type ChapelSessionOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    date?: SortOrder
    speakerId?: SortOrderInput | SortOrder
    _count?: ChapelSessionCountOrderByAggregateInput
    _avg?: ChapelSessionAvgOrderByAggregateInput
    _max?: ChapelSessionMaxOrderByAggregateInput
    _min?: ChapelSessionMinOrderByAggregateInput
    _sum?: ChapelSessionSumOrderByAggregateInput
  }

  export type ChapelSessionScalarWhereWithAggregatesInput = {
    AND?: ChapelSessionScalarWhereWithAggregatesInput | ChapelSessionScalarWhereWithAggregatesInput[]
    OR?: ChapelSessionScalarWhereWithAggregatesInput[]
    NOT?: ChapelSessionScalarWhereWithAggregatesInput | ChapelSessionScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ChapelSession"> | number
    title?: StringWithAggregatesFilter<"ChapelSession"> | string
    date?: DateTimeWithAggregatesFilter<"ChapelSession"> | Date | string
    speakerId?: IntNullableWithAggregatesFilter<"ChapelSession"> | number | null
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    email?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    userType?: EnumUserTypeFilter<"User"> | $Enums.UserType
    feedbacks?: FeedbackListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    userType?: SortOrder
    feedbacks?: FeedbackOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    userType?: EnumUserTypeFilter<"User"> | $Enums.UserType
    feedbacks?: FeedbackListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    userType?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    userType?: EnumUserTypeWithAggregatesFilter<"User"> | $Enums.UserType
  }

  export type FeedbackWhereInput = {
    AND?: FeedbackWhereInput | FeedbackWhereInput[]
    OR?: FeedbackWhereInput[]
    NOT?: FeedbackWhereInput | FeedbackWhereInput[]
    id?: IntFilter<"Feedback"> | number
    title?: StringFilter<"Feedback"> | string
    content?: StringNullableFilter<"Feedback"> | string | null
    published?: BoolFilter<"Feedback"> | boolean
    authorId?: IntFilter<"Feedback"> | number
    chapelSessionId?: IntNullableFilter<"Feedback"> | number | null
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
    chapelSession?: XOR<ChapelSessionNullableScalarRelationFilter, ChapelSessionWhereInput> | null
  }

  export type FeedbackOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrderInput | SortOrder
    published?: SortOrder
    authorId?: SortOrder
    chapelSessionId?: SortOrderInput | SortOrder
    author?: UserOrderByWithRelationInput
    chapelSession?: ChapelSessionOrderByWithRelationInput
  }

  export type FeedbackWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: FeedbackWhereInput | FeedbackWhereInput[]
    OR?: FeedbackWhereInput[]
    NOT?: FeedbackWhereInput | FeedbackWhereInput[]
    title?: StringFilter<"Feedback"> | string
    content?: StringNullableFilter<"Feedback"> | string | null
    published?: BoolFilter<"Feedback"> | boolean
    authorId?: IntFilter<"Feedback"> | number
    chapelSessionId?: IntNullableFilter<"Feedback"> | number | null
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
    chapelSession?: XOR<ChapelSessionNullableScalarRelationFilter, ChapelSessionWhereInput> | null
  }, "id">

  export type FeedbackOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrderInput | SortOrder
    published?: SortOrder
    authorId?: SortOrder
    chapelSessionId?: SortOrderInput | SortOrder
    _count?: FeedbackCountOrderByAggregateInput
    _avg?: FeedbackAvgOrderByAggregateInput
    _max?: FeedbackMaxOrderByAggregateInput
    _min?: FeedbackMinOrderByAggregateInput
    _sum?: FeedbackSumOrderByAggregateInput
  }

  export type FeedbackScalarWhereWithAggregatesInput = {
    AND?: FeedbackScalarWhereWithAggregatesInput | FeedbackScalarWhereWithAggregatesInput[]
    OR?: FeedbackScalarWhereWithAggregatesInput[]
    NOT?: FeedbackScalarWhereWithAggregatesInput | FeedbackScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Feedback"> | number
    title?: StringWithAggregatesFilter<"Feedback"> | string
    content?: StringNullableWithAggregatesFilter<"Feedback"> | string | null
    published?: BoolWithAggregatesFilter<"Feedback"> | boolean
    authorId?: IntWithAggregatesFilter<"Feedback"> | number
    chapelSessionId?: IntNullableWithAggregatesFilter<"Feedback"> | number | null
  }

  export type TaskWhereInput = {
    AND?: TaskWhereInput | TaskWhereInput[]
    OR?: TaskWhereInput[]
    NOT?: TaskWhereInput | TaskWhereInput[]
    id?: IntFilter<"Task"> | number
    title?: StringFilter<"Task"> | string
    completed?: BoolFilter<"Task"> | boolean
  }

  export type TaskOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    completed?: SortOrder
  }

  export type TaskWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: TaskWhereInput | TaskWhereInput[]
    OR?: TaskWhereInput[]
    NOT?: TaskWhereInput | TaskWhereInput[]
    title?: StringFilter<"Task"> | string
    completed?: BoolFilter<"Task"> | boolean
  }, "id">

  export type TaskOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    completed?: SortOrder
    _count?: TaskCountOrderByAggregateInput
    _avg?: TaskAvgOrderByAggregateInput
    _max?: TaskMaxOrderByAggregateInput
    _min?: TaskMinOrderByAggregateInput
    _sum?: TaskSumOrderByAggregateInput
  }

  export type TaskScalarWhereWithAggregatesInput = {
    AND?: TaskScalarWhereWithAggregatesInput | TaskScalarWhereWithAggregatesInput[]
    OR?: TaskScalarWhereWithAggregatesInput[]
    NOT?: TaskScalarWhereWithAggregatesInput | TaskScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Task"> | number
    title?: StringWithAggregatesFilter<"Task"> | string
    completed?: BoolWithAggregatesFilter<"Task"> | boolean
  }

  export type SpeakerCreateInput = {
    name: string
    chapelSessions?: ChapelSessionCreateNestedManyWithoutSpeakerInput
  }

  export type SpeakerUncheckedCreateInput = {
    id?: number
    name: string
    chapelSessions?: ChapelSessionUncheckedCreateNestedManyWithoutSpeakerInput
  }

  export type SpeakerUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    chapelSessions?: ChapelSessionUpdateManyWithoutSpeakerNestedInput
  }

  export type SpeakerUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    chapelSessions?: ChapelSessionUncheckedUpdateManyWithoutSpeakerNestedInput
  }

  export type SpeakerCreateManyInput = {
    id?: number
    name: string
  }

  export type SpeakerUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type SpeakerUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type ChapelSessionCreateInput = {
    title: string
    date: Date | string
    speaker?: SpeakerCreateNestedOneWithoutChapelSessionsInput
    feedbacks?: FeedbackCreateNestedManyWithoutChapelSessionInput
  }

  export type ChapelSessionUncheckedCreateInput = {
    id?: number
    title: string
    date: Date | string
    speakerId?: number | null
    feedbacks?: FeedbackUncheckedCreateNestedManyWithoutChapelSessionInput
  }

  export type ChapelSessionUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    speaker?: SpeakerUpdateOneWithoutChapelSessionsNestedInput
    feedbacks?: FeedbackUpdateManyWithoutChapelSessionNestedInput
  }

  export type ChapelSessionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    speakerId?: NullableIntFieldUpdateOperationsInput | number | null
    feedbacks?: FeedbackUncheckedUpdateManyWithoutChapelSessionNestedInput
  }

  export type ChapelSessionCreateManyInput = {
    id?: number
    title: string
    date: Date | string
    speakerId?: number | null
  }

  export type ChapelSessionUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChapelSessionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    speakerId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type UserCreateInput = {
    email: string
    name?: string | null
    userType?: $Enums.UserType
    feedbacks?: FeedbackCreateNestedManyWithoutAuthorInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    email: string
    name?: string | null
    userType?: $Enums.UserType
    feedbacks?: FeedbackUncheckedCreateNestedManyWithoutAuthorInput
  }

  export type UserUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    feedbacks?: FeedbackUpdateManyWithoutAuthorNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    feedbacks?: FeedbackUncheckedUpdateManyWithoutAuthorNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    email: string
    name?: string | null
    userType?: $Enums.UserType
  }

  export type UserUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
  }

  export type FeedbackCreateInput = {
    title: string
    content?: string | null
    published?: boolean
    author: UserCreateNestedOneWithoutFeedbacksInput
    chapelSession?: ChapelSessionCreateNestedOneWithoutFeedbacksInput
  }

  export type FeedbackUncheckedCreateInput = {
    id?: number
    title: string
    content?: string | null
    published?: boolean
    authorId: number
    chapelSessionId?: number | null
  }

  export type FeedbackUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
    author?: UserUpdateOneRequiredWithoutFeedbacksNestedInput
    chapelSession?: ChapelSessionUpdateOneWithoutFeedbacksNestedInput
  }

  export type FeedbackUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
    authorId?: IntFieldUpdateOperationsInput | number
    chapelSessionId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type FeedbackCreateManyInput = {
    id?: number
    title: string
    content?: string | null
    published?: boolean
    authorId: number
    chapelSessionId?: number | null
  }

  export type FeedbackUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
  }

  export type FeedbackUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
    authorId?: IntFieldUpdateOperationsInput | number
    chapelSessionId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type TaskCreateInput = {
    title: string
    completed?: boolean
  }

  export type TaskUncheckedCreateInput = {
    id?: number
    title: string
    completed?: boolean
  }

  export type TaskUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TaskUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TaskCreateManyInput = {
    id?: number
    title: string
    completed?: boolean
  }

  export type TaskUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TaskUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type ChapelSessionListRelationFilter = {
    every?: ChapelSessionWhereInput
    some?: ChapelSessionWhereInput
    none?: ChapelSessionWhereInput
  }

  export type ChapelSessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SpeakerCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type SpeakerAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type SpeakerMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type SpeakerMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type SpeakerSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type SpeakerNullableScalarRelationFilter = {
    is?: SpeakerWhereInput | null
    isNot?: SpeakerWhereInput | null
  }

  export type FeedbackListRelationFilter = {
    every?: FeedbackWhereInput
    some?: FeedbackWhereInput
    none?: FeedbackWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type FeedbackOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ChapelSessionCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    date?: SortOrder
    speakerId?: SortOrder
  }

  export type ChapelSessionAvgOrderByAggregateInput = {
    id?: SortOrder
    speakerId?: SortOrder
  }

  export type ChapelSessionMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    date?: SortOrder
    speakerId?: SortOrder
  }

  export type ChapelSessionMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    date?: SortOrder
    speakerId?: SortOrder
  }

  export type ChapelSessionSumOrderByAggregateInput = {
    id?: SortOrder
    speakerId?: SortOrder
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumUserTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.UserType | EnumUserTypeFieldRefInput<$PrismaModel>
    in?: $Enums.UserType[]
    notIn?: $Enums.UserType[]
    not?: NestedEnumUserTypeFilter<$PrismaModel> | $Enums.UserType
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    userType?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    userType?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    userType?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumUserTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserType | EnumUserTypeFieldRefInput<$PrismaModel>
    in?: $Enums.UserType[]
    notIn?: $Enums.UserType[]
    not?: NestedEnumUserTypeWithAggregatesFilter<$PrismaModel> | $Enums.UserType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserTypeFilter<$PrismaModel>
    _max?: NestedEnumUserTypeFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type ChapelSessionNullableScalarRelationFilter = {
    is?: ChapelSessionWhereInput | null
    isNot?: ChapelSessionWhereInput | null
  }

  export type FeedbackCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    published?: SortOrder
    authorId?: SortOrder
    chapelSessionId?: SortOrder
  }

  export type FeedbackAvgOrderByAggregateInput = {
    id?: SortOrder
    authorId?: SortOrder
    chapelSessionId?: SortOrder
  }

  export type FeedbackMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    published?: SortOrder
    authorId?: SortOrder
    chapelSessionId?: SortOrder
  }

  export type FeedbackMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    published?: SortOrder
    authorId?: SortOrder
    chapelSessionId?: SortOrder
  }

  export type FeedbackSumOrderByAggregateInput = {
    id?: SortOrder
    authorId?: SortOrder
    chapelSessionId?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type TaskCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    completed?: SortOrder
  }

  export type TaskAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type TaskMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    completed?: SortOrder
  }

  export type TaskMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    completed?: SortOrder
  }

  export type TaskSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ChapelSessionCreateNestedManyWithoutSpeakerInput = {
    create?: XOR<ChapelSessionCreateWithoutSpeakerInput, ChapelSessionUncheckedCreateWithoutSpeakerInput> | ChapelSessionCreateWithoutSpeakerInput[] | ChapelSessionUncheckedCreateWithoutSpeakerInput[]
    connectOrCreate?: ChapelSessionCreateOrConnectWithoutSpeakerInput | ChapelSessionCreateOrConnectWithoutSpeakerInput[]
    createMany?: ChapelSessionCreateManySpeakerInputEnvelope
    connect?: ChapelSessionWhereUniqueInput | ChapelSessionWhereUniqueInput[]
  }

  export type ChapelSessionUncheckedCreateNestedManyWithoutSpeakerInput = {
    create?: XOR<ChapelSessionCreateWithoutSpeakerInput, ChapelSessionUncheckedCreateWithoutSpeakerInput> | ChapelSessionCreateWithoutSpeakerInput[] | ChapelSessionUncheckedCreateWithoutSpeakerInput[]
    connectOrCreate?: ChapelSessionCreateOrConnectWithoutSpeakerInput | ChapelSessionCreateOrConnectWithoutSpeakerInput[]
    createMany?: ChapelSessionCreateManySpeakerInputEnvelope
    connect?: ChapelSessionWhereUniqueInput | ChapelSessionWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type ChapelSessionUpdateManyWithoutSpeakerNestedInput = {
    create?: XOR<ChapelSessionCreateWithoutSpeakerInput, ChapelSessionUncheckedCreateWithoutSpeakerInput> | ChapelSessionCreateWithoutSpeakerInput[] | ChapelSessionUncheckedCreateWithoutSpeakerInput[]
    connectOrCreate?: ChapelSessionCreateOrConnectWithoutSpeakerInput | ChapelSessionCreateOrConnectWithoutSpeakerInput[]
    upsert?: ChapelSessionUpsertWithWhereUniqueWithoutSpeakerInput | ChapelSessionUpsertWithWhereUniqueWithoutSpeakerInput[]
    createMany?: ChapelSessionCreateManySpeakerInputEnvelope
    set?: ChapelSessionWhereUniqueInput | ChapelSessionWhereUniqueInput[]
    disconnect?: ChapelSessionWhereUniqueInput | ChapelSessionWhereUniqueInput[]
    delete?: ChapelSessionWhereUniqueInput | ChapelSessionWhereUniqueInput[]
    connect?: ChapelSessionWhereUniqueInput | ChapelSessionWhereUniqueInput[]
    update?: ChapelSessionUpdateWithWhereUniqueWithoutSpeakerInput | ChapelSessionUpdateWithWhereUniqueWithoutSpeakerInput[]
    updateMany?: ChapelSessionUpdateManyWithWhereWithoutSpeakerInput | ChapelSessionUpdateManyWithWhereWithoutSpeakerInput[]
    deleteMany?: ChapelSessionScalarWhereInput | ChapelSessionScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ChapelSessionUncheckedUpdateManyWithoutSpeakerNestedInput = {
    create?: XOR<ChapelSessionCreateWithoutSpeakerInput, ChapelSessionUncheckedCreateWithoutSpeakerInput> | ChapelSessionCreateWithoutSpeakerInput[] | ChapelSessionUncheckedCreateWithoutSpeakerInput[]
    connectOrCreate?: ChapelSessionCreateOrConnectWithoutSpeakerInput | ChapelSessionCreateOrConnectWithoutSpeakerInput[]
    upsert?: ChapelSessionUpsertWithWhereUniqueWithoutSpeakerInput | ChapelSessionUpsertWithWhereUniqueWithoutSpeakerInput[]
    createMany?: ChapelSessionCreateManySpeakerInputEnvelope
    set?: ChapelSessionWhereUniqueInput | ChapelSessionWhereUniqueInput[]
    disconnect?: ChapelSessionWhereUniqueInput | ChapelSessionWhereUniqueInput[]
    delete?: ChapelSessionWhereUniqueInput | ChapelSessionWhereUniqueInput[]
    connect?: ChapelSessionWhereUniqueInput | ChapelSessionWhereUniqueInput[]
    update?: ChapelSessionUpdateWithWhereUniqueWithoutSpeakerInput | ChapelSessionUpdateWithWhereUniqueWithoutSpeakerInput[]
    updateMany?: ChapelSessionUpdateManyWithWhereWithoutSpeakerInput | ChapelSessionUpdateManyWithWhereWithoutSpeakerInput[]
    deleteMany?: ChapelSessionScalarWhereInput | ChapelSessionScalarWhereInput[]
  }

  export type SpeakerCreateNestedOneWithoutChapelSessionsInput = {
    create?: XOR<SpeakerCreateWithoutChapelSessionsInput, SpeakerUncheckedCreateWithoutChapelSessionsInput>
    connectOrCreate?: SpeakerCreateOrConnectWithoutChapelSessionsInput
    connect?: SpeakerWhereUniqueInput
  }

  export type FeedbackCreateNestedManyWithoutChapelSessionInput = {
    create?: XOR<FeedbackCreateWithoutChapelSessionInput, FeedbackUncheckedCreateWithoutChapelSessionInput> | FeedbackCreateWithoutChapelSessionInput[] | FeedbackUncheckedCreateWithoutChapelSessionInput[]
    connectOrCreate?: FeedbackCreateOrConnectWithoutChapelSessionInput | FeedbackCreateOrConnectWithoutChapelSessionInput[]
    createMany?: FeedbackCreateManyChapelSessionInputEnvelope
    connect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
  }

  export type FeedbackUncheckedCreateNestedManyWithoutChapelSessionInput = {
    create?: XOR<FeedbackCreateWithoutChapelSessionInput, FeedbackUncheckedCreateWithoutChapelSessionInput> | FeedbackCreateWithoutChapelSessionInput[] | FeedbackUncheckedCreateWithoutChapelSessionInput[]
    connectOrCreate?: FeedbackCreateOrConnectWithoutChapelSessionInput | FeedbackCreateOrConnectWithoutChapelSessionInput[]
    createMany?: FeedbackCreateManyChapelSessionInputEnvelope
    connect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type SpeakerUpdateOneWithoutChapelSessionsNestedInput = {
    create?: XOR<SpeakerCreateWithoutChapelSessionsInput, SpeakerUncheckedCreateWithoutChapelSessionsInput>
    connectOrCreate?: SpeakerCreateOrConnectWithoutChapelSessionsInput
    upsert?: SpeakerUpsertWithoutChapelSessionsInput
    disconnect?: SpeakerWhereInput | boolean
    delete?: SpeakerWhereInput | boolean
    connect?: SpeakerWhereUniqueInput
    update?: XOR<XOR<SpeakerUpdateToOneWithWhereWithoutChapelSessionsInput, SpeakerUpdateWithoutChapelSessionsInput>, SpeakerUncheckedUpdateWithoutChapelSessionsInput>
  }

  export type FeedbackUpdateManyWithoutChapelSessionNestedInput = {
    create?: XOR<FeedbackCreateWithoutChapelSessionInput, FeedbackUncheckedCreateWithoutChapelSessionInput> | FeedbackCreateWithoutChapelSessionInput[] | FeedbackUncheckedCreateWithoutChapelSessionInput[]
    connectOrCreate?: FeedbackCreateOrConnectWithoutChapelSessionInput | FeedbackCreateOrConnectWithoutChapelSessionInput[]
    upsert?: FeedbackUpsertWithWhereUniqueWithoutChapelSessionInput | FeedbackUpsertWithWhereUniqueWithoutChapelSessionInput[]
    createMany?: FeedbackCreateManyChapelSessionInputEnvelope
    set?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    disconnect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    delete?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    connect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    update?: FeedbackUpdateWithWhereUniqueWithoutChapelSessionInput | FeedbackUpdateWithWhereUniqueWithoutChapelSessionInput[]
    updateMany?: FeedbackUpdateManyWithWhereWithoutChapelSessionInput | FeedbackUpdateManyWithWhereWithoutChapelSessionInput[]
    deleteMany?: FeedbackScalarWhereInput | FeedbackScalarWhereInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FeedbackUncheckedUpdateManyWithoutChapelSessionNestedInput = {
    create?: XOR<FeedbackCreateWithoutChapelSessionInput, FeedbackUncheckedCreateWithoutChapelSessionInput> | FeedbackCreateWithoutChapelSessionInput[] | FeedbackUncheckedCreateWithoutChapelSessionInput[]
    connectOrCreate?: FeedbackCreateOrConnectWithoutChapelSessionInput | FeedbackCreateOrConnectWithoutChapelSessionInput[]
    upsert?: FeedbackUpsertWithWhereUniqueWithoutChapelSessionInput | FeedbackUpsertWithWhereUniqueWithoutChapelSessionInput[]
    createMany?: FeedbackCreateManyChapelSessionInputEnvelope
    set?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    disconnect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    delete?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    connect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    update?: FeedbackUpdateWithWhereUniqueWithoutChapelSessionInput | FeedbackUpdateWithWhereUniqueWithoutChapelSessionInput[]
    updateMany?: FeedbackUpdateManyWithWhereWithoutChapelSessionInput | FeedbackUpdateManyWithWhereWithoutChapelSessionInput[]
    deleteMany?: FeedbackScalarWhereInput | FeedbackScalarWhereInput[]
  }

  export type FeedbackCreateNestedManyWithoutAuthorInput = {
    create?: XOR<FeedbackCreateWithoutAuthorInput, FeedbackUncheckedCreateWithoutAuthorInput> | FeedbackCreateWithoutAuthorInput[] | FeedbackUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: FeedbackCreateOrConnectWithoutAuthorInput | FeedbackCreateOrConnectWithoutAuthorInput[]
    createMany?: FeedbackCreateManyAuthorInputEnvelope
    connect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
  }

  export type FeedbackUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: XOR<FeedbackCreateWithoutAuthorInput, FeedbackUncheckedCreateWithoutAuthorInput> | FeedbackCreateWithoutAuthorInput[] | FeedbackUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: FeedbackCreateOrConnectWithoutAuthorInput | FeedbackCreateOrConnectWithoutAuthorInput[]
    createMany?: FeedbackCreateManyAuthorInputEnvelope
    connect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumUserTypeFieldUpdateOperationsInput = {
    set?: $Enums.UserType
  }

  export type FeedbackUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<FeedbackCreateWithoutAuthorInput, FeedbackUncheckedCreateWithoutAuthorInput> | FeedbackCreateWithoutAuthorInput[] | FeedbackUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: FeedbackCreateOrConnectWithoutAuthorInput | FeedbackCreateOrConnectWithoutAuthorInput[]
    upsert?: FeedbackUpsertWithWhereUniqueWithoutAuthorInput | FeedbackUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: FeedbackCreateManyAuthorInputEnvelope
    set?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    disconnect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    delete?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    connect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    update?: FeedbackUpdateWithWhereUniqueWithoutAuthorInput | FeedbackUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: FeedbackUpdateManyWithWhereWithoutAuthorInput | FeedbackUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: FeedbackScalarWhereInput | FeedbackScalarWhereInput[]
  }

  export type FeedbackUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<FeedbackCreateWithoutAuthorInput, FeedbackUncheckedCreateWithoutAuthorInput> | FeedbackCreateWithoutAuthorInput[] | FeedbackUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: FeedbackCreateOrConnectWithoutAuthorInput | FeedbackCreateOrConnectWithoutAuthorInput[]
    upsert?: FeedbackUpsertWithWhereUniqueWithoutAuthorInput | FeedbackUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: FeedbackCreateManyAuthorInputEnvelope
    set?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    disconnect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    delete?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    connect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    update?: FeedbackUpdateWithWhereUniqueWithoutAuthorInput | FeedbackUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: FeedbackUpdateManyWithWhereWithoutAuthorInput | FeedbackUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: FeedbackScalarWhereInput | FeedbackScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutFeedbacksInput = {
    create?: XOR<UserCreateWithoutFeedbacksInput, UserUncheckedCreateWithoutFeedbacksInput>
    connectOrCreate?: UserCreateOrConnectWithoutFeedbacksInput
    connect?: UserWhereUniqueInput
  }

  export type ChapelSessionCreateNestedOneWithoutFeedbacksInput = {
    create?: XOR<ChapelSessionCreateWithoutFeedbacksInput, ChapelSessionUncheckedCreateWithoutFeedbacksInput>
    connectOrCreate?: ChapelSessionCreateOrConnectWithoutFeedbacksInput
    connect?: ChapelSessionWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneRequiredWithoutFeedbacksNestedInput = {
    create?: XOR<UserCreateWithoutFeedbacksInput, UserUncheckedCreateWithoutFeedbacksInput>
    connectOrCreate?: UserCreateOrConnectWithoutFeedbacksInput
    upsert?: UserUpsertWithoutFeedbacksInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFeedbacksInput, UserUpdateWithoutFeedbacksInput>, UserUncheckedUpdateWithoutFeedbacksInput>
  }

  export type ChapelSessionUpdateOneWithoutFeedbacksNestedInput = {
    create?: XOR<ChapelSessionCreateWithoutFeedbacksInput, ChapelSessionUncheckedCreateWithoutFeedbacksInput>
    connectOrCreate?: ChapelSessionCreateOrConnectWithoutFeedbacksInput
    upsert?: ChapelSessionUpsertWithoutFeedbacksInput
    disconnect?: ChapelSessionWhereInput | boolean
    delete?: ChapelSessionWhereInput | boolean
    connect?: ChapelSessionWhereUniqueInput
    update?: XOR<XOR<ChapelSessionUpdateToOneWithWhereWithoutFeedbacksInput, ChapelSessionUpdateWithoutFeedbacksInput>, ChapelSessionUncheckedUpdateWithoutFeedbacksInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumUserTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.UserType | EnumUserTypeFieldRefInput<$PrismaModel>
    in?: $Enums.UserType[]
    notIn?: $Enums.UserType[]
    not?: NestedEnumUserTypeFilter<$PrismaModel> | $Enums.UserType
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedEnumUserTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserType | EnumUserTypeFieldRefInput<$PrismaModel>
    in?: $Enums.UserType[]
    notIn?: $Enums.UserType[]
    not?: NestedEnumUserTypeWithAggregatesFilter<$PrismaModel> | $Enums.UserType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserTypeFilter<$PrismaModel>
    _max?: NestedEnumUserTypeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type ChapelSessionCreateWithoutSpeakerInput = {
    title: string
    date: Date | string
    feedbacks?: FeedbackCreateNestedManyWithoutChapelSessionInput
  }

  export type ChapelSessionUncheckedCreateWithoutSpeakerInput = {
    id?: number
    title: string
    date: Date | string
    feedbacks?: FeedbackUncheckedCreateNestedManyWithoutChapelSessionInput
  }

  export type ChapelSessionCreateOrConnectWithoutSpeakerInput = {
    where: ChapelSessionWhereUniqueInput
    create: XOR<ChapelSessionCreateWithoutSpeakerInput, ChapelSessionUncheckedCreateWithoutSpeakerInput>
  }

  export type ChapelSessionCreateManySpeakerInputEnvelope = {
    data: ChapelSessionCreateManySpeakerInput | ChapelSessionCreateManySpeakerInput[]
  }

  export type ChapelSessionUpsertWithWhereUniqueWithoutSpeakerInput = {
    where: ChapelSessionWhereUniqueInput
    update: XOR<ChapelSessionUpdateWithoutSpeakerInput, ChapelSessionUncheckedUpdateWithoutSpeakerInput>
    create: XOR<ChapelSessionCreateWithoutSpeakerInput, ChapelSessionUncheckedCreateWithoutSpeakerInput>
  }

  export type ChapelSessionUpdateWithWhereUniqueWithoutSpeakerInput = {
    where: ChapelSessionWhereUniqueInput
    data: XOR<ChapelSessionUpdateWithoutSpeakerInput, ChapelSessionUncheckedUpdateWithoutSpeakerInput>
  }

  export type ChapelSessionUpdateManyWithWhereWithoutSpeakerInput = {
    where: ChapelSessionScalarWhereInput
    data: XOR<ChapelSessionUpdateManyMutationInput, ChapelSessionUncheckedUpdateManyWithoutSpeakerInput>
  }

  export type ChapelSessionScalarWhereInput = {
    AND?: ChapelSessionScalarWhereInput | ChapelSessionScalarWhereInput[]
    OR?: ChapelSessionScalarWhereInput[]
    NOT?: ChapelSessionScalarWhereInput | ChapelSessionScalarWhereInput[]
    id?: IntFilter<"ChapelSession"> | number
    title?: StringFilter<"ChapelSession"> | string
    date?: DateTimeFilter<"ChapelSession"> | Date | string
    speakerId?: IntNullableFilter<"ChapelSession"> | number | null
  }

  export type SpeakerCreateWithoutChapelSessionsInput = {
    name: string
  }

  export type SpeakerUncheckedCreateWithoutChapelSessionsInput = {
    id?: number
    name: string
  }

  export type SpeakerCreateOrConnectWithoutChapelSessionsInput = {
    where: SpeakerWhereUniqueInput
    create: XOR<SpeakerCreateWithoutChapelSessionsInput, SpeakerUncheckedCreateWithoutChapelSessionsInput>
  }

  export type FeedbackCreateWithoutChapelSessionInput = {
    title: string
    content?: string | null
    published?: boolean
    author: UserCreateNestedOneWithoutFeedbacksInput
  }

  export type FeedbackUncheckedCreateWithoutChapelSessionInput = {
    id?: number
    title: string
    content?: string | null
    published?: boolean
    authorId: number
  }

  export type FeedbackCreateOrConnectWithoutChapelSessionInput = {
    where: FeedbackWhereUniqueInput
    create: XOR<FeedbackCreateWithoutChapelSessionInput, FeedbackUncheckedCreateWithoutChapelSessionInput>
  }

  export type FeedbackCreateManyChapelSessionInputEnvelope = {
    data: FeedbackCreateManyChapelSessionInput | FeedbackCreateManyChapelSessionInput[]
  }

  export type SpeakerUpsertWithoutChapelSessionsInput = {
    update: XOR<SpeakerUpdateWithoutChapelSessionsInput, SpeakerUncheckedUpdateWithoutChapelSessionsInput>
    create: XOR<SpeakerCreateWithoutChapelSessionsInput, SpeakerUncheckedCreateWithoutChapelSessionsInput>
    where?: SpeakerWhereInput
  }

  export type SpeakerUpdateToOneWithWhereWithoutChapelSessionsInput = {
    where?: SpeakerWhereInput
    data: XOR<SpeakerUpdateWithoutChapelSessionsInput, SpeakerUncheckedUpdateWithoutChapelSessionsInput>
  }

  export type SpeakerUpdateWithoutChapelSessionsInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type SpeakerUncheckedUpdateWithoutChapelSessionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type FeedbackUpsertWithWhereUniqueWithoutChapelSessionInput = {
    where: FeedbackWhereUniqueInput
    update: XOR<FeedbackUpdateWithoutChapelSessionInput, FeedbackUncheckedUpdateWithoutChapelSessionInput>
    create: XOR<FeedbackCreateWithoutChapelSessionInput, FeedbackUncheckedCreateWithoutChapelSessionInput>
  }

  export type FeedbackUpdateWithWhereUniqueWithoutChapelSessionInput = {
    where: FeedbackWhereUniqueInput
    data: XOR<FeedbackUpdateWithoutChapelSessionInput, FeedbackUncheckedUpdateWithoutChapelSessionInput>
  }

  export type FeedbackUpdateManyWithWhereWithoutChapelSessionInput = {
    where: FeedbackScalarWhereInput
    data: XOR<FeedbackUpdateManyMutationInput, FeedbackUncheckedUpdateManyWithoutChapelSessionInput>
  }

  export type FeedbackScalarWhereInput = {
    AND?: FeedbackScalarWhereInput | FeedbackScalarWhereInput[]
    OR?: FeedbackScalarWhereInput[]
    NOT?: FeedbackScalarWhereInput | FeedbackScalarWhereInput[]
    id?: IntFilter<"Feedback"> | number
    title?: StringFilter<"Feedback"> | string
    content?: StringNullableFilter<"Feedback"> | string | null
    published?: BoolFilter<"Feedback"> | boolean
    authorId?: IntFilter<"Feedback"> | number
    chapelSessionId?: IntNullableFilter<"Feedback"> | number | null
  }

  export type FeedbackCreateWithoutAuthorInput = {
    title: string
    content?: string | null
    published?: boolean
    chapelSession?: ChapelSessionCreateNestedOneWithoutFeedbacksInput
  }

  export type FeedbackUncheckedCreateWithoutAuthorInput = {
    id?: number
    title: string
    content?: string | null
    published?: boolean
    chapelSessionId?: number | null
  }

  export type FeedbackCreateOrConnectWithoutAuthorInput = {
    where: FeedbackWhereUniqueInput
    create: XOR<FeedbackCreateWithoutAuthorInput, FeedbackUncheckedCreateWithoutAuthorInput>
  }

  export type FeedbackCreateManyAuthorInputEnvelope = {
    data: FeedbackCreateManyAuthorInput | FeedbackCreateManyAuthorInput[]
  }

  export type FeedbackUpsertWithWhereUniqueWithoutAuthorInput = {
    where: FeedbackWhereUniqueInput
    update: XOR<FeedbackUpdateWithoutAuthorInput, FeedbackUncheckedUpdateWithoutAuthorInput>
    create: XOR<FeedbackCreateWithoutAuthorInput, FeedbackUncheckedCreateWithoutAuthorInput>
  }

  export type FeedbackUpdateWithWhereUniqueWithoutAuthorInput = {
    where: FeedbackWhereUniqueInput
    data: XOR<FeedbackUpdateWithoutAuthorInput, FeedbackUncheckedUpdateWithoutAuthorInput>
  }

  export type FeedbackUpdateManyWithWhereWithoutAuthorInput = {
    where: FeedbackScalarWhereInput
    data: XOR<FeedbackUpdateManyMutationInput, FeedbackUncheckedUpdateManyWithoutAuthorInput>
  }

  export type UserCreateWithoutFeedbacksInput = {
    email: string
    name?: string | null
    userType?: $Enums.UserType
  }

  export type UserUncheckedCreateWithoutFeedbacksInput = {
    id?: number
    email: string
    name?: string | null
    userType?: $Enums.UserType
  }

  export type UserCreateOrConnectWithoutFeedbacksInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFeedbacksInput, UserUncheckedCreateWithoutFeedbacksInput>
  }

  export type ChapelSessionCreateWithoutFeedbacksInput = {
    title: string
    date: Date | string
    speaker?: SpeakerCreateNestedOneWithoutChapelSessionsInput
  }

  export type ChapelSessionUncheckedCreateWithoutFeedbacksInput = {
    id?: number
    title: string
    date: Date | string
    speakerId?: number | null
  }

  export type ChapelSessionCreateOrConnectWithoutFeedbacksInput = {
    where: ChapelSessionWhereUniqueInput
    create: XOR<ChapelSessionCreateWithoutFeedbacksInput, ChapelSessionUncheckedCreateWithoutFeedbacksInput>
  }

  export type UserUpsertWithoutFeedbacksInput = {
    update: XOR<UserUpdateWithoutFeedbacksInput, UserUncheckedUpdateWithoutFeedbacksInput>
    create: XOR<UserCreateWithoutFeedbacksInput, UserUncheckedCreateWithoutFeedbacksInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFeedbacksInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFeedbacksInput, UserUncheckedUpdateWithoutFeedbacksInput>
  }

  export type UserUpdateWithoutFeedbacksInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
  }

  export type UserUncheckedUpdateWithoutFeedbacksInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
  }

  export type ChapelSessionUpsertWithoutFeedbacksInput = {
    update: XOR<ChapelSessionUpdateWithoutFeedbacksInput, ChapelSessionUncheckedUpdateWithoutFeedbacksInput>
    create: XOR<ChapelSessionCreateWithoutFeedbacksInput, ChapelSessionUncheckedCreateWithoutFeedbacksInput>
    where?: ChapelSessionWhereInput
  }

  export type ChapelSessionUpdateToOneWithWhereWithoutFeedbacksInput = {
    where?: ChapelSessionWhereInput
    data: XOR<ChapelSessionUpdateWithoutFeedbacksInput, ChapelSessionUncheckedUpdateWithoutFeedbacksInput>
  }

  export type ChapelSessionUpdateWithoutFeedbacksInput = {
    title?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    speaker?: SpeakerUpdateOneWithoutChapelSessionsNestedInput
  }

  export type ChapelSessionUncheckedUpdateWithoutFeedbacksInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    speakerId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type ChapelSessionCreateManySpeakerInput = {
    id?: number
    title: string
    date: Date | string
  }

  export type ChapelSessionUpdateWithoutSpeakerInput = {
    title?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    feedbacks?: FeedbackUpdateManyWithoutChapelSessionNestedInput
  }

  export type ChapelSessionUncheckedUpdateWithoutSpeakerInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    feedbacks?: FeedbackUncheckedUpdateManyWithoutChapelSessionNestedInput
  }

  export type ChapelSessionUncheckedUpdateManyWithoutSpeakerInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedbackCreateManyChapelSessionInput = {
    id?: number
    title: string
    content?: string | null
    published?: boolean
    authorId: number
  }

  export type FeedbackUpdateWithoutChapelSessionInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
    author?: UserUpdateOneRequiredWithoutFeedbacksNestedInput
  }

  export type FeedbackUncheckedUpdateWithoutChapelSessionInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
    authorId?: IntFieldUpdateOperationsInput | number
  }

  export type FeedbackUncheckedUpdateManyWithoutChapelSessionInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
    authorId?: IntFieldUpdateOperationsInput | number
  }

  export type FeedbackCreateManyAuthorInput = {
    id?: number
    title: string
    content?: string | null
    published?: boolean
    chapelSessionId?: number | null
  }

  export type FeedbackUpdateWithoutAuthorInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
    chapelSession?: ChapelSessionUpdateOneWithoutFeedbacksNestedInput
  }

  export type FeedbackUncheckedUpdateWithoutAuthorInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
    chapelSessionId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type FeedbackUncheckedUpdateManyWithoutAuthorInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
    chapelSessionId?: NullableIntFieldUpdateOperationsInput | number | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}
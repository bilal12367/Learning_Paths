export class CreateUserDto {
      id: number;
    
      firstName: string;
    
      lastName: string;

      email: string;

      password: string;
    
      isActive: boolean;

      public static build(): CreateUserDto {
            return new CreateUserDto();
      }

      setId(id: number) : this {
            this.id = id;
            return this
      }

      setEmail(email: string): this {
            this.email = email;
            return this;
      }

      setPassword(password: string): this {
            this.password = password;
            return this;
      }

      setFirstName(firstName: string) : this {
            this.firstName = firstName;
            return this
      }

      setLastName(lastName: string): this {
            this.lastName = lastName
            return this
      }

      setIsActive(isActive: boolean) : this {
            this.isActive = isActive
            return this
      }

}
